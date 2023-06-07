using MoneyTracker.DAL.Entities.Enums;

namespace MoneyTracker.DAL.Entities
{
    public class Wallet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Currencies Currency { get; set; } = Currencies.UAH;

        //public decimal Balance { get; set; }

    }
}
