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




        public class DeactivatePersonalAccountCommandHandler : ICommandHandler<DeactivatePersonalAccountCommand>
        {
            private readonly IEventStore eventStore;

            public DeactivatePersonalAccountCommandHandler(IEventStore eventStore)
            {
                this.eventStore = eventStore;
            }

            public async Task<bool> HandleAsync(DeactivatePersonalAccountCommand command)
            {
                // Ensure that command.UserId is a string
                string userIdString = command.UserId.ToString();

                // Convert the string representation of AccountId and UserId to Guid
                Guid accountId = Guid.Parse(command.AccountId);
                Guid userId = Guid.Parse(userIdString);

                var @event = new PersonalAccountDeactivatedEvent(accountId, userId);

                await eventStore.AppendEventAsync(@event);

                return true;
            }
        }



    }
}
