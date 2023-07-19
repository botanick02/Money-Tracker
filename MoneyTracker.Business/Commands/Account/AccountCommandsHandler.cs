﻿using MoneyTracker.Business.Events.Account;
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
            public bool Handle(CreatePersonalAccountCommand command)
            {
                var @event = new PersonalAccountCreatedEvent
                (
                    Id: Guid.NewGuid(),
                    UserId: command.UserId,
                    Name: command.Name,
                    Currency: currencyRepository.GetCurrencyByCode("UAH")
                );

                eventStore.AppendEvent(@event);

                return true;
            }
        }
    }
}
