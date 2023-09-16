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
            }

            if (categoryRepository.GetServiceCategory(ServiceCategories.Transfer) == null)
            {
                var events = new List<Event>
                    {
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), "Transfer", TransactionTypes.DoubleSided, "./media/icons/transfer.svg", "#d9d9d9"),
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), "Gone", TransactionTypes.DoubleSided, "./media/icons/exit.svg", "#d9d9d9"),
                    new ServiceCategoryCreatedEvent(Guid.NewGuid(), "Comission", TransactionTypes.DoubleSided, "./media/icons/transfer.svg", "#d9d9d9")
                };


                eventStore.AppendEventsAsync(events);
            }
        }
    }
}
