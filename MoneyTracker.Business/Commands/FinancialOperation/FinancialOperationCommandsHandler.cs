using MoneyTracker.Business.Events.FinancialOperation;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public class AddFinancialOperationCommandHandler : ICommandHandler<AddFinancialOperationCommand>
    {
        private readonly IEventStore eventStore;

        public AddFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(AddFinancialOperationCommand command)
        {
            var transactionId = Guid.NewGuid();

            var debitTransactionEvent = new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount : command.Amount
            );

            var creditTransactionEvent = new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.FromAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            eventStore.AppendEvent(debitTransactionEvent); //TODO: implement simultaneous event append with sql transactions
            eventStore.AppendEvent(creditTransactionEvent);

            return true;
        }
    }

    public class CancelFinancialOperationCommandHandler : ICommandHandler<CancelFinancialOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ITransactionRepository transactionRepository;


        public CancelFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
        {
            this.eventStore = eventStore;
            this.transactionRepository = transactionRepository;
        }

        public bool Handle(CancelFinancialOperationCommand command)
        {
            var transactions = transactionRepository.GetTransactionsByTransactionId(command.TransactionId);
            if (transactions.Count < 2)
            {
                return false;
            }

            var cancelEvent = new FinancialOperationCanceledEvent
            (
                OperationId: command.TransactionId
            );

            eventStore.AppendEvent(cancelEvent);

            return true;
        }
    }
}
