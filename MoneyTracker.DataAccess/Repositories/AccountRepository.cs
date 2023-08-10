using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System;

namespace MoneyTracker.DataAccess.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public AccountRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public Account? GetUserAccountById(Guid accountId)
        {
            var readModel = readModelExtensions.GetReadModel();
            return readModel.Accounts.FirstOrDefault(a => a.Id == accountId);
        }

        public List<Account> GetUserAccounts(Guid userId, AccountType type, DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Accounts.Where(a => a.UserId == userId).Where(a => a.Type == type).ToList();
        }
    }
}
