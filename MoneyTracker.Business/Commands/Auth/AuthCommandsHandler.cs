using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Commands.Auth.AuthCommands;
using static MoneyTracker.Business.Events.Auth.AuthEvents;

namespace MoneyTracker.Business.Commands.Auth
{
    public class AuthCommandsHandler
    {
        public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
        {
            private readonly IUserRepository userRepository;
            private readonly IEventStore eventStore;

            public RegisterUserCommandHandler(IUserRepository userRepository, IEventStore eventStore)
            {
                this.userRepository = userRepository;
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
}
