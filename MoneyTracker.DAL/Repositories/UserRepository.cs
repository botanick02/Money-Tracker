using MoneyTracker.DAL.Entities;
using MoneyTracker.DAL.Repositories.IRepositories;

namespace MoneyTracker.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> users = new List<User>();

        public UserRepository() 
        {
            users.Add(new User
            {
                Id = 1,
                Name = "John",
                Email = "john@example.com",
                Password = "password1"
            });
        }
        public User? GetUserById(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            return user;
        }
        public User? GetUserByEmail(string email)
        {
            var user = users.FirstOrDefault(u => u.Email == email);
            return user;
        }

        public User? CreateUser(User user)
        {
            user.Id = GetNextId();
            users.Add(user);
            return user;
        }

        public User? UpdateUser(User user)
        {
            var existingUser = users.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.RefreshToken = user.RefreshToken;
            }
            return existingUser;
        }

        public bool DeleteUser(User user)
        {
            bool removed = users.Remove(user);
            return removed;
        }

        private int GetNextId()
        {
            if (users.Count > 0)
            {
                int maxId = users.Max(u => u.Id);
                return maxId + 1;
            }
            return 1;
        }
    }
}
