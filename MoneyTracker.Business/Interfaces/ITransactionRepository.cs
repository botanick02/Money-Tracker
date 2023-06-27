
using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ITransactionRepository
    {
        Transaction GetById(Guid transactionId);
        IEnumerable<Transaction> GetAllByUserId(Guid userId);
        void Create(Transaction transaction);
        void Update(Transaction transaction);
        void Delete(Guid transactionId);
    }
}
