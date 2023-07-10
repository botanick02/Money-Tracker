using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System;

namespace MoneyTracker.Infrastracture.MsSQL
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public TransactionRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public List<Transaction> GetTransactions(DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Transactions.ToList();
        }
    }
}
