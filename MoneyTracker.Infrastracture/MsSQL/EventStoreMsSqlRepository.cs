using Dapper;
using Microsoft.Extensions.Configuration;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using System.Data.SqlClient;

namespace MoneyTracker.Infrastracture.MsSQL
{
    public class EventStoreMsSqlRepository : IEventStoreRepository
    {
        private readonly string connectionString;
        public EventStoreMsSqlRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSQL")!;
        }

        public void AppendEvent(StoredEvent @event)
        {
            const string query = @"
            INSERT INTO Events (Type, CreatedAt, Data)
            VALUES (@Type, @CreatedAt, @Data)";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                conn.Execute(query, new { @event.Type, @event.CreatedAt, @event.Data });
            }
        }

        public List<StoredEvent> GetEvents(DateTime? dateTimeTo = null)
        {

            string query = @"
            SELECT *
            FROM Events";

            if (dateTimeTo != null)
            {
                query += " WHERE CreatedAt <= @DateTimeTo";
            }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                return conn.Query<StoredEvent>(query, new { DateTimeTo = dateTimeTo }).ToList();
            }

        }
    }
}
