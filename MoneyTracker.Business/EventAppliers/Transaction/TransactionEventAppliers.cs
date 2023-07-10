using MoneyTracker.Business.ReadStoreModel;
using static MoneyTracker.Business.Events.Transaction.TransactionEvents;

namespace MoneyTracker.Business.EventAppliers.Transaction
{
    public class TransactionEventAppliers
    {
        public class DebitTransactionAddedEventApplier : IEventApplier<DebitTransactionAddedEvent>
        {
            public ReadModel Apply(ReadModel currentModel, DebitTransactionAddedEvent @event)
            {
                var updatedModel = currentModel;

                var debitTransaction = new Entities.Transaction
                {
                    Id = @event.Id,
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

        public class DebitTransactionCanceledEventApplier : IEventApplier<TransactionCanceledEvent>
        {
            public ReadModel Apply(ReadModel currentModel, TransactionCanceledEvent @event)
            {
                var updatedModel = currentModel;

                var debitTransactionToCancel = updatedModel.Transactions.FirstOrDefault(t => t.Id == @event.DebitTransactionId);

                var creditTransactionToCancel = updatedModel.Transactions.FirstOrDefault(t => t.Id == @event.CreditTransactionId);

                if (debitTransactionToCancel == null || creditTransactionToCancel == null)
                {
                    throw new ArgumentException("Credit or debit transaction was not found to cancel", nameof(@event));
                }

                updatedModel.Transactions.Remove(debitTransactionToCancel);
                updatedModel.Transactions.Remove(creditTransactionToCancel);

                return updatedModel;
            }
        }
    }
}
