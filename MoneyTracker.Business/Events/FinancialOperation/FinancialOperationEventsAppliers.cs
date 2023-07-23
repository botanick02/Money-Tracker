﻿using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.FinancialOperation
{
    public class DebitTransactionAddedEventApplier : IEventApplier<DebitTransactionAddedEvent>
    {
        public ReadModel Apply(ReadModel currentModel, DebitTransactionAddedEvent @event)
        {
            var updatedModel = currentModel;

            var debitTransaction = new Entities.Transaction
            {
                Id = @event.Id,
                OperationId = @event.OperationId,
                UserId = @event.UserId,
                Title = @event.Title,
                Note = @event.Note,
                Amount = @event.Amount,
                CategoryId = @event.CategoryId,
                CreatedAt = @event.CreatedAt,
                AccountId = @event.AccountId
            };

            updatedModel.Transactions = updatedModel.Transactions.Append(debitTransaction);

            return updatedModel;
        }
    }

    public class CreditTransactionAddedEventApplier : IEventApplier<CreditTransactionAddedEvent>
    {
        public ReadModel Apply(ReadModel currentModel, CreditTransactionAddedEvent @event)
        {
            var updatedModel = currentModel;

            var debitTransaction = new Entities.Transaction
            {
                Id = @event.Id,
                OperationId = @event.OperationId,
                UserId = @event.UserId,
                Title = @event.Title,
                Note = @event.Note,
                Amount = @event.Amount * -1,
                CategoryId = @event.CategoryId,
                CreatedAt = @event.CreatedAt,
                AccountId = @event.AccountId
            };

            updatedModel.Transactions = updatedModel.Transactions.Append(debitTransaction);

            return updatedModel;
        }
    }

    public class FinancialOperationCanceledEventApplier : IEventApplier<FinancialOperationCanceledEvent>
    {
        public ReadModel Apply(ReadModel currentModel, FinancialOperationCanceledEvent @event)
        {
            var updatedModel = currentModel;

            var transactionsToCancel = updatedModel.Transactions.Where(t => t.OperationId == @event.OperationId).ToList();

            if (transactionsToCancel.Count < 2)
            {
                throw new ArgumentException("Transaction to cancel was not found", nameof(@event));
            }

            foreach (var transaction in transactionsToCancel)
            {
                updatedModel.Transactions = updatedModel.Transactions.Where(t => t != transaction);
            }

            return updatedModel;
        }
    }
}