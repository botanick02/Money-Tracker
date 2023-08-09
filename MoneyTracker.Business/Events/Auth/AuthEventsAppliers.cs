using MoneyTracker.Business.Entities;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.Auth
{
    public class UserRegisteredEventApplier : IEventApplier<UserRegisteredEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, UserRegisteredEvent @event)
        {
            var newUser = new User(@event.Email, @event.Name)
            {
                Id = @event.UserId,
                PasswordHash = @event.PasswordHash,
                PasswordSalt = @event.PasswordSalt,
                GoogleAuth = @event.GoogleAuth,
            };

            var updatedModel = currentModel;
            updatedModel.Users = updatedModel.Users.Append(newUser);

            return updatedModel;
        }
    }

    public class GoogleUserRegisteredEventApplier : IEventApplier<GoogleUserRegisteredEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, GoogleUserRegisteredEvent @event)
        {
            var newUser = new User(@event.Email, @event.Name)
            {
                Id = @event.UserId,
                GoogleAuth = false
            };

            var updatedModel = currentModel;
            updatedModel.Users = updatedModel.Users.Append(newUser);

            return updatedModel;
        }
    }

    public class UserRefreshTokenSetEventApplier : IEventApplier<UserRefreshTokenSetEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, UserRefreshTokenSetEvent @event)
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