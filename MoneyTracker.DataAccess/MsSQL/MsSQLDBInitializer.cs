using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SqlClient;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events.Categories;

namespace MoneyTracker.DataAccess.MsSQL
{
    public class MsSQLDBInitializer : IDBInitializer
    {
        private readonly string connectionString;
        private readonly IEventStore eventStore;
        private readonly ICategoryRepository categoryRepository;

        public MsSQLDBInitializer(IConfiguration configuration, IEventStore eventStore, ICategoryRepository categoryRepository)
        {
            string? connectionString = configuration.GetConnectionString("MsSQL");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string not found", nameof(connectionString));
            }
            this.connectionString = connectionString;
            this.eventStore = eventStore;
            this.categoryRepository = categoryRepository;
        }

        public void InitializeDatabase()
        {
            const string checkTableQuery = "SELECT 1 FROM sys.tables WHERE name = 'Events'";

            const string checkServiceCatQuery = "SELECT COUNT(*) FROM Events WHERE Type LIKE '%ServiceCategoryCreated%'";

            const string createTableQuery = @"
                CREATE TABLE Events
                (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    Type NVARCHAR(255) NOT NULL,
                    CreatedAt DATETIME NOT NULL,
                    Data NVARCHAR(MAX) NOT NULL
                )
            ";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                int tableExists = conn.ExecuteScalar<int>(checkTableQuery);

                if (tableExists != 1)
                {
                    conn.Execute(createTableQuery);
                }

                int serviceCreationEvents = conn.ExecuteScalar<int>(checkServiceCatQuery);

                if (serviceCreationEvents < 1)
                {
                    var events = new List<BaseEvent>
                    {
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), ServiceCategories.MoneyTransfer.ToString(), TransactionTypes.Transfer, "./media/icons/transfer.svg", "#d9d9d9"),
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), ServiceCategories.Gone.ToString(), TransactionTypes.Transfer, "./media/icons/exit.svg", "#d9d9d9"),
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), ServiceCategories.Comission.ToString(), TransactionTypes.Transfer, "./media/icons/transfer.svg", "#d9d9d9")
                };
                    eventStore.AppendEventsAsync(events);
                }
            }
        }
    }
}
