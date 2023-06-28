using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.MsSQL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private List<User> users = new List<User>();

        public UserRepository()
        {
            users.Add(new User("john@example.com", "John")
            {
                PasswordHash = "iRvIS1UHa2MZ7sExsJCL9uZrd+uEdWlr+Y/KUrnH1iI=",
                PasswordSalt = "zjXh750tlEvmvRM1HAVj7g=="
            });
        }
        public async Task<User?> GetUserByIdAsync(string id)
        {
            var user = users.FirstOrDefault(u => u.Id.ToString() == id);
            return user;
        }
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = users.FirstOrDefault(u => u.Email == email);
            return user;
        }

        public async Task<User?> CreateUserAsync(User user)
        {
            users.Add(user);
            return user;
        }

        public async Task<User?> UpdateUserAsync(User user)
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

        public async Task<bool> DeleteUserAsync(User user)
        {
            bool removed = users.Remove(user);
            return removed;
        }
    }
}
