using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess
{
    internal class AccountRepository : IAccountRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public AccountRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public List<Account> GetUserAccounts(Guid userId, AccountType type, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Accounts.Where(a => a.UserId == userId).Where(a => a.Type == type).ToList();
        }
    }
}
