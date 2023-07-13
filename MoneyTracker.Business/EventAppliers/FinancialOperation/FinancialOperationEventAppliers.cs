using MoneyTracker.Business.ReadStoreModel;
using static MoneyTracker.Business.Events.FinancialOperation.FinancialOperationEvents;

namespace MoneyTracker.Business.EventAppliers.FinancialOperation
{
    public class FinancialOperationEventAppliers
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

                updatedModel.Transactions.Add(debitTransaction);

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

                updatedModel.Transactions.Add(debitTransaction);

                return updatedModel;
            }
        }

        public class FinancialOperationCanceledEventApplier : IEventApplier<FinancialOperationCanceled>
        {
            public ReadModel Apply(ReadModel currentModel, FinancialOperationCanceled @event)
            {
                var updatedModel = currentModel;

                var transactionsToCancel = updatedModel.Transactions.Where(t => t.OperationId == @event.OperationId).ToList();

                if (transactionsToCancel.Count < 2)
                {
                    throw new ArgumentException("Transaction to cancel was not found", nameof(@event));
                }

                foreach (var transaction in transactionsToCancel)
                {
                    updatedModel.Transactions.Remove(transaction);
                }

                return updatedModel;
            }
        }
    }
}
