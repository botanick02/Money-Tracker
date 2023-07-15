using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data.SqlClient;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess.MsSQL
{
    public class MsSQLDBInitializer : IDBInitializer
    {
        private readonly string connectionString;

        public MsSQLDBInitializer(IConfiguration configuration)
        {
            string? connectionString = configuration.GetConnectionString("MsSQL");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string not found", nameof(connectionString));
            }
            this.connectionString = connectionString;
        }

        public void InitializeDatabase()
        {
            const string script = @"
                IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Events')
                BEGIN
                    CREATE TABLE Events
                    (
                        Id INT IDENTITY(1,1) PRIMARY KEY,
                        Type NVARCHAR(255) NOT NULL,
                        CreatedAt DATETIME NOT NULL,
                        Data NVARCHAR(MAX) NOT NULL,
                    )
                END            
                ";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                conn.Execute(script);
            }
        }
    }
}
