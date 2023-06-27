using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.MsSQL.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private List<Transaction> transactions = new List<Transaction>();

        public void Create(Transaction transaction)
        {
            transactions.Add(transaction);
        }

        public void Delete(Guid transactionId)
        {
            var transaction = transactions.FirstOrDefault(t => t.Id == transactionId);
            if (transaction != null)
            {
                transactions.Remove(transaction);
            }
        }

        public IEnumerable<Transaction> GetAllByUserId(Guid userId)
        {
            return transactions.Where(t => t.UserId == userId);
        }

        public Transaction GetById(Guid transactionId)
        {
            return transactions.FirstOrDefault(t => t.Id == transactionId);
        }

        public void Update(Transaction transaction)
        {
            throw new NotImplementedException();
        }
    }
}
