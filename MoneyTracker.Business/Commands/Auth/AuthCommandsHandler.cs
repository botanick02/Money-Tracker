using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Auth
{
    public class AuthCommandsHandler {
        public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;

            public RegisterUserCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
            }

            public bool Handle(RegisterUserCommand command)
            {
                var events = new List<Event>();

                var newUserId = Guid.NewGuid();

                events.Add(new UserRegisteredEvent(
                    UserId: newUserId,
                    Email: command.Email,
                    Name: command.Name,
                    PasswordHash: command.PasswordHash,
                    PasswordSalt: command.PasswordSalt
                ));

                var currency = currencyRepository.GetCurrencyByCode("UAH");

                AddInitAccountsEvents(newUserId, currency, ref events);

                foreach (var @event in events)
                {
                    eventStore.AppendEvent(@event);
                }
                return true;
            }
        }

        public class RegisterGoogleUserCommandHandler : ICommandHandler<RegisterGoogleUserCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;

            public RegisterGoogleUserCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
            }

            public bool Handle(RegisterGoogleUserCommand command)
            {
                var events = new List<Event>();

                var newUserId = Guid.NewGuid();

                events.Add(new GoogleUserRegisteredEvent(
                    UserId: newUserId,
                    Email: command.Email,
                    Name: command.Name
                ));

                var currency = currencyRepository.GetCurrencyByCode("UAH");

                AddInitAccountsEvents(newUserId, currency, ref events);

                foreach (var @event in events)
                {
                    eventStore.AppendEvent(@event);
                }
                return true;
            }
        }
        public static void AddInitAccountsEvents(Guid userId, Currency currency, ref List<Event> events)
        {
            var creditAccountEevnt = new CreditAccountCreatedEvent(Guid.NewGuid(), userId, currency);
            var debitAccountEevnt = new DebitAccountCreatedEvent(Guid.NewGuid(), userId, currency);
            var personalAccountEevnt = new PersonalAccountCreatedEvent(Guid.NewGuid(), userId, "Cash", currency);

            events.Add(creditAccountEevnt);
            events.Add(debitAccountEevnt);
            events.Add(personalAccountEevnt);
        }

        public class SetUserRefreshTokenCommandHandler : ICommandHandler<SetUserRefreshTokenCommand>
        {
            private readonly IUserRepository userRepository;
            private readonly IEventStore eventStore;

            public SetUserRefreshTokenCommandHandler(IUserRepository userRepository, IEventStore eventStore)
            {
                this.userRepository = userRepository;
                this.eventStore = eventStore;
            }

            public bool Handle(SetUserRefreshTokenCommand command)
            {
                var userRefreshTokenSetEvent = new UserRefreshTokenSetEvent(UserId: command.UserId,
                    RefreshToken: command.RefreshToken);

                eventStore.AppendEvent(userRefreshTokenSetEvent);

                return true;
            }
        }
    }
}