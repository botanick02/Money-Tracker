using MoneyTracker.Business.Entities;
using Newtonsoft.Json;

namespace MoneyTracker.DataAccess
{
    public class CurrencyRepository
    {
        public List<Currency> Currencies { get; }

        public CurrencyRepository()
        {
            var path = @"../MoneyTracker.DataAccess/Resources/Currencies.json";
            var currencies = JsonConvert.DeserializeObject<List<Currency>>(File.ReadAllText(path));
            if (currencies == null)
            {
                throw new FileNotFoundException("Currencies were failed to receive");
            }
            Currencies = currencies;
        }
    }
}
