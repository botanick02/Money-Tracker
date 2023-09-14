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
                    Currency: command.Currency,
                    IsActive:true
                );

                await eventStore.AppendEventAsync(@event);

                return true;
            }
        }

        public class UpdatePersonalAccountCommandHandler : ICommandHandler<UpdatePersonalAccountCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;

            public UpdatePersonalAccountCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
            }

            public async Task<bool> HandleAsync(UpdatePersonalAccountCommand command)
            {
                var @event = new UpdatePersonalAccountEvent
                (
                    AccountId: Guid.Parse(command.AccountId),
                    Name: command.Name
                   

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
                Guid accountId = Guid.Parse(command.AccountId);
               

                var personalAccountDeactivatedEvent = new PersonalAccountDeactivatedEvent(accountId);
                await eventStore.AppendEventAsync(personalAccountDeactivatedEvent);

                return true;
            }
        }




    }
    }
