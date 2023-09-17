using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Auth
{
    public class AuthCommandsHandler
    {
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
                var newUserId = Guid.NewGuid();
                var events = CreateEventsForUserRegistration(newUserId, command);

                await eventStore.AppendEventsAsync(events);
                return true;
            }

            private List<Event> CreateEventsForUserRegistration(Guid newUserId, RegisterUserCommand command)
            {
                var events = new List<Event>
                {
                    new UserRegisteredEvent(newUserId, command.Email, command.Name, command.PasswordHash, command.PasswordSalt)
                };

                var currency = currencyRepository.GetCurrencyByCode("UAH");
                AddInitAccountsEvents(newUserId, currency, events);

                AddDefaultCategories(newUserId, events, categoryRepository);

                return events;
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
                var newUserId = Guid.NewGuid();
                var events = CreateEventsForGoogleUserRegistration(newUserId, command);

                await eventStore.AppendEventsAsync(events);
                return true;
            }

            private List<Event> CreateEventsForGoogleUserRegistration(Guid newUserId, RegisterGoogleUserCommand command)
            {
                var events = new List<Event>
                {
                    new GoogleUserRegisteredEvent(newUserId, command.Email, command.Name)
                };

                var currency = currencyRepository.GetCurrencyByCode("UAH");
                AddInitAccountsEvents(newUserId, currency, events);

                AddDefaultCategories(newUserId, events, categoryRepository);

                return events;
            }
        }

        public static void AddInitAccountsEvents(Guid userId, Currency currency, List<Event> events)
        {
            events.Add(new CreditAccountCreatedEvent(Guid.NewGuid(), userId, currency));
            events.Add(new DebitAccountCreatedEvent(Guid.NewGuid(), userId, currency));
            events.Add(new PersonalAccountCreatedEvent(Guid.NewGuid(), userId, "Cash", currency,true));
        }

        public static void AddDefaultCategories(Guid userId, List<Event> events, ICategoryRepository categoryRepository)
        {
            var defaultCategories = categoryRepository.GetDefaultCategories();

            foreach (var category in defaultCategories.IncomeCategories)
            {
                events.Add(new CategoryCreatedEvent(Guid.NewGuid(), userId, category.Name, TransactionTypes.Income, category.IconUrl, category.Color));
            }

            foreach (var category in defaultCategories.ExpenseCategories)
            {
                events.Add(new CategoryCreatedEvent(Guid.NewGuid(), userId, category.Name, TransactionTypes.Expense, category.IconUrl, category.Color));
            }

           
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
                var userRefreshTokenSetEvent = new UserRefreshTokenSetEvent(command.UserId, command.RefreshToken);
                await eventStore.AppendEventAsync(userRefreshTokenSetEvent);

                return true;
            }
        }
    }
}