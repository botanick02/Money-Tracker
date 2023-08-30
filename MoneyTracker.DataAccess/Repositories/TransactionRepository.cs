using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IReadModelExtensions readModelExtensions;

        public TransactionRepository(IReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public List<Transaction> GetTransactionsByOperationId(Guid operationId, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.Where(t => t.OperationId == operationId).ToList();
        }

        public List<Transaction> GetUserTransactions(Guid userId, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.Where(t => t.UserId == userId).ToList();
        }

        public List<Transaction> GetAccountTransactions(Guid accountId, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.Where(t => t.AccountId == accountId).ToList();
        }
    }
}
