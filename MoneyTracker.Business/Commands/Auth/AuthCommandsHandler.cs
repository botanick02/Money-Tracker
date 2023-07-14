using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Auth
{
    public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
    {
        private readonly IEventStore eventStore;

        public RegisterUserCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(RegisterUserCommand command)
        {
            var userRegisteredEvent = new UserRegisteredEvent
            {
                UserId = Guid.NewGuid(),
                Email = command.Email,
                Name = command.Name,
                PasswordHash = command.PasswordHash,
                PasswordSalt = command.PasswordSalt,
            };
            eventStore.AppendEvent(userRegisteredEvent);

            return true;
        }
    }

    public class RegisterGoogleUserCommandHandler : ICommandHandler<RegisterGoogleUserCommand>
    {
        private readonly IUserRepository userRepository;
        private readonly IEventStore eventStore;

        public RegisterGoogleUserCommandHandler(IUserRepository userRepository, IEventStore eventStore)
        {
            this.userRepository = userRepository;
            this.eventStore = eventStore;
        }

        public bool Handle(RegisterGoogleUserCommand command)
        {
            var userRegisteredEvent = new GoogleUserRegisteredEvent
            {
                UserId = Guid.NewGuid(),
                Email = command.Email,
                Name = command.Name,
            };
            eventStore.AppendEvent(userRegisteredEvent);

            return true;
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

        public bool Handle(SetUserRefreshTokenCommand command)
        {
            var userRefreshTokenSetEvent = new UserRefreshTokenSetEvent
            {
                UserId = command.UserId,
                RefreshToken = command.RefreshToken
            };

            eventStore.AppendEvent(userRefreshTokenSetEvent);

            return true;
        }
    }
}