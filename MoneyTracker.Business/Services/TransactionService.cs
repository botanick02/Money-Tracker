using System;
using System.Collections.Generic;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Services
{
    public class TransactionService
    {
        private readonly ITransactionRepository transactionRepository;
        private readonly IEventStore eventStore;


        public TransactionService(ITransactionRepository transactionRepository, IEventStore eventStore)
        {
            this.transactionRepository = transactionRepository;
            this.eventStore = eventStore;
        }

        public void CreateTransaction(CreateTransactionCommand command)
        {
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = command.UserId,
                Title = command.Title,
                Note = command.Note,
                Amount = command.Amount,
                CategoryId = command.CategoryId,
                DateTime = command.DateTime,
                AccountId = command.AccountId
            };


            // Raise the TransactionCreatedEvent
            var transactionCreatedEvent = new TransactionCreatedEvent(
                transaction.Id,
                transaction.UserId,
                transaction.Title,
                transaction.Note,
                transaction.Amount,
                transaction.CategoryId,
                transaction.DateTime,
                transaction.AccountId);

            eventStore.AppendEvent(transactionCreatedEvent);

        }
    }
}
