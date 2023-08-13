using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Account
{
    public class AccountCommandsHandler
    {
        public class CreatePersonalAccountCommandHandler : ICommandHandler<CreatePersonalAccountCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;

            public CreatePersonalAccountCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
            }
            public async Task<bool> HandleAsync(CreatePersonalAccountCommand command)
            {
                var @event = new PersonalAccountCreatedEvent
                (
                    AccountId: Guid.NewGuid(),
                    UserId: command.UserId,
                    Name: command.Name,
                    Currency: currencyRepository.GetCurrencyByCode("UAH")
                );

                await eventStore.AppendEventAsync(@event);

                return true;
            }
        }
    }
}
