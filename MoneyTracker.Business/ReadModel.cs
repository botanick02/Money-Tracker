using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.ReadStoreModel
{
    public class ReadModel
    {
        public IEnumerable<User> Users { get; set; } = Enumerable.Empty<User>();

        public IEnumerable<Account> Accounts { get; set; } = Enumerable.Empty<Account>();

        public IEnumerable<Transaction> Transactions { get; set; }  = Enumerable.Empty<Transaction>();

        public IEnumerable<Category> Categories { get; set; } = Enumerable.Empty<Category>();
    }
}
