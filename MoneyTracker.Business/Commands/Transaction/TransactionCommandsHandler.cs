using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Commands.Transaction.TransactionCommands;
using static MoneyTracker.Business.Events.Transaction.TransactionEvents;

namespace MoneyTracker.Business.Commands.Transaction
{
    public class TransactionCommandsHandler
    {
        public class AddTransactionCommandHandler : ICommandHandler<AddTransactionCommand>
        {
            private readonly IEventStore eventStore;

            public AddTransactionCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
            {
                this.eventStore = eventStore;
            }

            public bool Handle(AddTransactionCommand command)
            {
                var transactionId = Guid.NewGuid();

                var debitTransactionEvent = new DebitTransactionAddedEvent
                {
                    TransactionId = transactionId,
                    UserId = command.UserId,
                    CategoryId = command.CategoryId,
                    CreatedAt = DateTime.UtcNow,
                    AccountId = command.ToAccountId,
                    Title = command.Title,
                    Note = command.Note,
                    Amount = command.Amount,
                };

                var creditTransactionEvent = new CreditTransactionAddedEvent
                {
                    TransactionId = transactionId,
                    UserId = command.UserId,
                    CategoryId = command.CategoryId,
                    CreatedAt = DateTime.UtcNow,
                    AccountId = command.FromAccountId,
                    Title = command.Title,
                    Note = command.Note,
                    Amount = command.Amount,
                };

                eventStore.AppendEvent(debitTransactionEvent); //TODO: implement simultaneous event append with sql transactions
                eventStore.AppendEvent(creditTransactionEvent);

                return true;
            }
        }

        public class CancelTransactionCommandHandler : ICommandHandler<CancelTransactionCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ITransactionRepository transactionRepository;


            public CancelTransactionCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
            {
                this.eventStore = eventStore;
                this.transactionRepository = transactionRepository;
            }

            public bool Handle(CancelTransactionCommand command)
            {
                var transactions = transactionRepository.GetTransactionsByTransactionId(command.TransactionId);
                if (transactions.Count < 2)
                {
                    return false;
                }

                var cancelEvent = new TransactionCanceledEvent
                {
                    TransactionId = command.TransactionId,
                };

                eventStore.AppendEvent(cancelEvent);

                return true;
            }
        }
    }
}
