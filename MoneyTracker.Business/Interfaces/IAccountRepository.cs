using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IAccountRepository
    {
        List<Account> GetUserAccounts(Guid userId, AccountType type, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null);

        Account? GetUserAccountById(Guid accountId, IReadModelExtensions? readModelExtensionsScoped = null);
    }
}
