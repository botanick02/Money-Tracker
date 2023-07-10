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

            public AddTransactionCommandHandler(IEventStore eventStore)
            {
                this.eventStore = eventStore;
            }

            public bool Handle(AddTransactionCommand command)
            {
                var debitTransaction = new DebitTransactionAddedEvent
                {
                    Id = Guid.NewGuid(),
                    UserId = command.UserId,
                    CategoryId = command.CategoryId,
                    CreatedAt = DateTime.UtcNow,
                    AccountId = command.ToAccountId,
                    Title = command.Title,
                    Note = command.Note,
                    Amount = command.Amount,
                };

                var creditTransaction = new CreditTransactionAddedEvent
                {
                    Id = Guid.NewGuid(),
                    UserId = command.UserId,
                    CategoryId = command.CategoryId,
                    CreatedAt = DateTime.UtcNow,
                    AccountId = command.FromAccountId,
                    Title = command.Title,
                    Note = command.Note,
                    Amount = command.Amount,
                };

                eventStore.AppendEvent(debitTransaction); //TODO: implement simultaneous event append with sql transactions
                eventStore.AppendEvent(creditTransaction);

                return true;
            }
        }
    }
}
