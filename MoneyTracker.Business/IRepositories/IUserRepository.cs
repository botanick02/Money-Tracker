using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.IRepositories
{
    public interface IUserRepository
    {
        User? GetUserById(string id);

        User? GetUserByEmail(string email);

        User? CreateUser(User user);

        User? UpdateUser(User user);

        bool DeleteUser(User user);
    }
}
