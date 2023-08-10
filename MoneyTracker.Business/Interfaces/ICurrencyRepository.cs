using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ICurrencyRepository
    {
        public Currency GetCurrencyByCode(string code);
    }
}
