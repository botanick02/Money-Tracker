using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Auth
{
    public class AuthCommandsHandler {
        public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;
            private readonly ICategoryRepository categoryRepository;

            public RegisterUserCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository, ICategoryRepository categoryRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
                this.categoryRepository = categoryRepository;
            }

            public async Task<bool> HandleAsync(RegisterUserCommand command)
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

                eventStore.AppendEventsAsync(events);
                return true;
            }
        }

        public class RegisterGoogleUserCommandHandler : ICommandHandler<RegisterGoogleUserCommand>
        {
            private readonly IEventStore eventStore;
            private readonly ICurrencyRepository currencyRepository;
            private readonly ICategoryRepository categoryRepository;

            public RegisterGoogleUserCommandHandler(IEventStore eventStore, ICurrencyRepository currencyRepository, ICategoryRepository categoryRepository)
            {
                this.eventStore = eventStore;
                this.currencyRepository = currencyRepository;
                this.categoryRepository = categoryRepository;
            }

            public async Task<bool> HandleAsync(RegisterGoogleUserCommand command)
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

                var defaultCategories = categoryRepository.GetDefaultCategories();

                events.AddRange(defaultCategories.IncomeCategories
                    .Select(category => new CategoryCreatedEvent(newUserId, category.Name, "income", category.IconUrl, category.Color))
                    .Concat(defaultCategories.ExpenseCategories
                        .Select(category => new CategoryCreatedEvent(newUserId, category.Name, "expense", category.IconUrl, category.Color))));

                events.Add(new CategoryCreatedEvent(
                       UserId: newUserId,
                       Name: "Transfer",
                       Type: "transfer",
                       IconUrl: "./media/icons/transfer.svg",
                       Color: "#d9d9d9"
                   ));

                await eventStore.AppendEventsAsync(events);

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

            public async Task<bool> HandleAsync(SetUserRefreshTokenCommand command)
            {
                var userRefreshTokenSetEvent = new UserRefreshTokenSetEvent(UserId: command.UserId,
                    RefreshToken: command.RefreshToken);

                await eventStore.AppendEventAsync(userRefreshTokenSetEvent);

                return true;
            }
        }
    }
}