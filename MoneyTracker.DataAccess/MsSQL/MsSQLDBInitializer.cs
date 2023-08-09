using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SqlClient;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;

namespace MoneyTracker.DataAccess.MsSQL
{
    public class MsSQLDBInitializer : IDBInitializer
    {
        private readonly string connectionString;
        private readonly CommandDispatcher commandDispatcher;

        public MsSQLDBInitializer(IConfiguration configuration, CommandDispatcher commandDispatcher)
        {
            string? connectionString = configuration.GetConnectionString("MsSQL");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string not found", nameof(connectionString));
            }
            this.connectionString = connectionString;
            this.commandDispatcher = commandDispatcher;
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

                    var transferCategoryCommand = new CreateCategoryCommand(new Business.Entities.Category()
                    {
                        Name = "Transfer",
                        Type = "transfer",
                        IconUrl = "./media/icons/transfer.svg",
                        Color = "#d9d9d9",
                    });

                    commandDispatcher.DispatchAsync(transferCategoryCommand);
                }
            }
        }
    }
}
