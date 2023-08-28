using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IReadModelExtensions readModelExtensions;
        public UserRepository(IReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public User GetUserById(Guid id, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            var user = readModel.Users.FirstOrDefault(u => u.Id == id);
            return user;
        }

        public User GetUserByEmail(string email, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            var user = readModel.Users.FirstOrDefault(u => u.Email == email);
            return user;
        }
    }
}
