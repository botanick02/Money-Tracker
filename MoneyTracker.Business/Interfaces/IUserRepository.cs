using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(string id);

        Task<User?> GetUserByEmailAsync(string email);

        Task<User?> CreateUserAsync(User user);

        Task<User?> UpdateUserAsync(User user);

        Task<bool> DeleteUserAsync(User user);
    }
}
