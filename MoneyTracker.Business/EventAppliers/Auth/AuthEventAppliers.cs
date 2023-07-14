using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.EventAppliers.Auth
{
    public class UserRegisteredEventApplier : IEventApplier<UserRegisteredEvent>
    {
        public ReadModel Apply(ReadModel currentModel, UserRegisteredEvent @event)
        {
            var newUser = new User(@event.Email, @event.Name)
            {
                Id = @event.UserId,
                PasswordHash = @event.PasswordHash,
                PasswordSalt = @event.PasswordSalt,
                GoogleAuth = @event.GoogleAuth,
            };

            var updatedModel = currentModel;
            updatedModel.Users.Add(newUser);

            return updatedModel;
        }
    }

    public class GoogleUserRegisteredEventApplier : IEventApplier<GoogleUserRegisteredEvent>
    {
        public ReadModel Apply(ReadModel currentModel, GoogleUserRegisteredEvent @event)
        {
            var newUser = new User(@event.Email, @event.Name)
            {
                Id = @event.UserId,
                GoogleAuth = false
            };

            var updatedModel = currentModel;
            updatedModel.Users.Add(newUser);

            return updatedModel;
        }
    }

    public class UserRefreshTokenSetEventApplier : IEventApplier<UserRefreshTokenSetEvent>
    {
        public ReadModel Apply(ReadModel currentModel, UserRefreshTokenSetEvent @event)
        {
            var userToUpdate = currentModel.Users.FirstOrDefault(u => u.Id == @event.UserId);
            if (userToUpdate != null)
            {
                userToUpdate.RefreshToken = @event.RefreshToken;
            }

            return currentModel;
        }
    }
}