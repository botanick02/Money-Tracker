using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.EventHandlers
{
    public class TransactionCreatedEventHandler : IEventHandler<TransactionCreatedEvent>
    {
        private readonly ITransactionRepository transactionRepository;

        public TransactionCreatedEventHandler(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }

        public void Handle(TransactionCreatedEvent _event)
        {
            Transaction transaction = new Transaction
            {
                Id = _event.TransactionId,
                UserId = _event.UserId,
                Title = _event.Title,
                Note = _event.Note,
                Amount = _event.Amount,
                CategoryId = _event.CategoryId,
                DateTime = _event.DateTime,
                AccountId = _event.AccountId
            };

            transactionRepository.Create(transaction);
        }
    }
}
