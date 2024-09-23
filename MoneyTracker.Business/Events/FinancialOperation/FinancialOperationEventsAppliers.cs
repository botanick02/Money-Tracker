using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.FinancialOperation
{
    public class DebitTransactionAddedEventApplier : IEventApplier<DebitTransactionAddedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, DebitTransactionAddedEvent @event)
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
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, CreditTransactionAddedEvent @event)
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

    public class FinancialOperationCanceledEventApplier : IEventApplier<FinancialOperationCanceledEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationCanceledEvent @event)
        {
            var updatedModel = currentModel;

            var transactionsToCancel = updatedModel.Transactions.Where(t => t.OperationId == @event.OperationId).ToList();

            if (transactionsToCancel.Count < 2)
            {
                throw new ArgumentException("Transaction to cancel was not found", nameof(@event));
            }

            foreach (var transaction in transactionsToCancel)
            {
                updatedModel.Transactions = updatedModel.Transactions.Where(t => t != transaction).ToList();
            }

            return updatedModel;
        }
    }

    public class FinancialOperationAmountUpdatedEventApplier : IEventApplier<FinancialOperationAmountUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationAmountUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationsToUpdate = updatedModel.Transactions.Where(o => o.OperationId == @event.OperationId).ToList();
            foreach (var operationToUpdate in operationsToUpdate)
            {
                if (operationToUpdate.Amount >= 0)
                {
                    operationToUpdate.Amount = @event.Amount >= 0 ? @event.Amount : -@event.Amount;
                }
                else
                {
                    operationToUpdate.Amount = @event.Amount < 0 ? @event.Amount : -@event.Amount;
                }
            }

            return updatedModel;
        }
    }

    public class FinancialOperationTitleUpdatedEventApplier : IEventApplier<FinancialOperationTitleUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationTitleUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationsToUpdate = updatedModel.Transactions.Where(o => o.OperationId == @event.OperationId).ToList();
            foreach (var operationToUpdate in operationsToUpdate)
            {
                operationToUpdate.Title = @event.Title;
            }

            return updatedModel;
        }
    }

    public class FinancialOperationCategoryIdUpdatedEventApplier : IEventApplier<FinancialOperationCategoryIdUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationCategoryIdUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationsToUpdate = updatedModel.Transactions.Where(o => o.OperationId == @event.OperationId).ToList();
            foreach (var operationToUpdate in operationsToUpdate)
            {
                operationToUpdate.CategoryId = @event.CategoryId;
            }

            return updatedModel;
        }
    }

    public class FinancialOperationNoteUpdatedEventApplier : IEventApplier<FinancialOperationNoteUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationNoteUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationsToUpdate = updatedModel.Transactions.Where(o => o.OperationId == @event.OperationId).ToList();
            foreach (var operationToUpdate in operationsToUpdate)
            {
                operationToUpdate.Note = @event.Note;
            }

            return updatedModel;
        }
    }

    public class FinancialOperationCreatedAtUpdatedEventApplier : IEventApplier<FinancialOperationCreatedAtUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationCreatedAtUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationsToUpdate = updatedModel.Transactions.Where(o => o.OperationId == @event.OperationId).ToList();
            foreach (var operationToUpdate in operationsToUpdate)
            {
                operationToUpdate.CreatedAt = @event.CreatedAt;
            }

            return updatedModel;
        }
    }

    public class FinancialOperationAccountUpdatedEventApplier : IEventApplier<FinancialOperationAccountUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, FinancialOperationAccountUpdatedEvent @event)
        {
            var updatedModel = currentModel;

            var operationToUpdate = updatedModel.Transactions.Where(o => o.Id == @event.TransactionId).FirstOrDefault();

            operationToUpdate.AccountId = @event.AccountId;

            return updatedModel;
        }
    }

}
