using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IAccountRepository
    {
        List<Account> GetUserAccounts(Guid userId, AccountType type, DateTime? dateTimeTo = null);

        Account? GetUserAccountById(Guid accountId);
    }
}
