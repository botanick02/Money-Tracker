using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public TransactionRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public List<Transaction> GetTransactionsByTransactionId(Guid transactionId, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.Where(t => t.OperationId == transactionId).ToList();
        }

        public List<Transaction> GetTransactions(Guid userId, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.Where(t => t.UserId == userId).ToList();
        }
    }
}
