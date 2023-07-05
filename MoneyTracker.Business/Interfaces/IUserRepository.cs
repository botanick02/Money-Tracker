using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IUserRepository
    {
        User GetUserById(Guid id, DateTime? dateTimeTo = null);

        User GetUserByEmail(string email, DateTime? dateTimeTo = null);
    }
}
