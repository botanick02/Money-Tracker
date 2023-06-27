using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.CommandHandlers
{
    public class CreateTransactionCommandHandler : ICommandHandler<CreateTransactionCommand>
    {
        private readonly IEventStore eventStore;
        private readonly EventDispatcher eventDispatcher;

        public CreateTransactionCommandHandler(IEventStore eventStore, EventDispatcher eventDispatcher)
        {
            this.eventStore = eventStore;
            this.eventDispatcher = eventDispatcher;
        }

        public void Handle(CreateTransactionCommand command)
        {
            var transactionId = Guid.NewGuid();

            var transactionCreatedEvent = new TransactionCreatedEvent(
                transactionId: transactionId,
                userId: command.UserId,
                title: command.Title,
                note: command.Note,
                amount: command.Amount,
                categoryId: command.CategoryId,
                dateTime: command.DateTime,
                accountId: command.AccountId
            );

            eventStore.AppendEvent(transactionCreatedEvent);
            eventDispatcher.Dispatch(transactionCreatedEvent);
        }
    }
}