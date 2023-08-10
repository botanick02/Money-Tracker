using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ITransactionRepository
    {
        List<Transaction> GetUserTransactions(Guid userId, DateTime? dateTimeTo = null);

        List<Transaction> GetAccountTransactions(Guid accountId, DateTime? dateTimeTo = null);

        List<Transaction> GetTransactionsByOperationId(Guid operationId, DateTime? dateTimeTo = null);
    }
}
