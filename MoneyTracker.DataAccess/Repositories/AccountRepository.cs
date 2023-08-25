using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System;

namespace MoneyTracker.DataAccess.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IReadModelExtensions readModelExtensions;
        public AccountRepository(IReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public Account? GetUserAccountById(Guid accountId, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel();
            return readModel.Accounts.FirstOrDefault(a => a.Id == accountId);
        }

        public List<Account> GetUserAccounts(Guid userId, AccountType type, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Accounts.Where(a => a.UserId == userId).Where(a => a.Type == type).ToList();
        }
    }
}
