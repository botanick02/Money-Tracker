using MoneyTracker.DAL.Entities;

namespace MoneyTracker.DAL.Repositories.IRepositories
{
    public interface IUserRepository
    {
        User? GetUserById(int id);

        User? GetUserByEmail(string email);

        User? CreateUser(User user);

        User? UpdateUser(User user);

        bool DeleteUser(User user);
    }
}
