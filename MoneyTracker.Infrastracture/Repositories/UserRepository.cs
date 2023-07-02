using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Infrastracture;
using System;

namespace MoneyTracker.MsSQL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public UserRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public User GetUserById(Guid id, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            var user = readModel.Users.FirstOrDefault(u => u.Id == id);
            return user;
        }
        public User GetUserByEmail(string email, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            var user = readModel.Users.FirstOrDefault(u => u.Email == email);
            return user;
        }
    }
}
