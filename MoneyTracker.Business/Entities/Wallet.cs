using MoneyTracker.Business.Entities.Enums;

namespace MoneyTracker.Business.Entities
{
    public class Wallet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Currencies Currency { get; set; } = Currencies.UAH;

        //public decimal Balance { get; set; }

    }
}
