using Dapper;
using Microsoft.Extensions.Configuration;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using System.Data.SqlClient;

namespace MoneyTracker.DataAccess.MsSQL
{
    public class EventStoreMsSqlRepository : IEventStoreRepository
    {
        private readonly string connectionString;
        public EventStoreMsSqlRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSQL")!;
        }

        public async Task AppendEventsAsync(List<StoredEvent> events)
        {
            const string insertQuery = @"
            INSERT INTO Events (Type, CreatedAt, Data)
            VALUES (@Type, @CreatedAt, @Data)";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        foreach (var @event in events)
                        {
                            await conn.ExecuteAsync(insertQuery, new
                            {
                                @event.Type,
                                @event.CreatedAt,
                                @event.Data
                            }, transaction);
                        }

                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
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