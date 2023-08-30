namespace MoneyTracker.Business.Entities
{
    public class Account
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public AccountType Type { get; set; }

        public Currency Currency { get; set; }
    }

    public enum AccountType
    {
        Credit,
        Debit,
        Personal
    }
}
