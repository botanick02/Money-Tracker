using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;

namespace MoneyTracker.DataAccess.Repositories
{
    public class CurrencyRepository : ICurrencyRepository
    {
        private readonly IEnumerable<Currency> currencies;

        public CurrencyRepository()
        {
            //var path = @"../MoneyTracker.DataAccess/Resources/Currencies.json";
            //var readCurrencies = JsonConvert.DeserializeObject<List<Currency>>(File.ReadAllText(path));
            //if (readCurrencies == null)
            //{
            //    throw new FileNotFoundException("Currencies were failed to receive");
            //}
            //currencies = readCurrencies;
            currencies = new List<Currency>
            {
                new Currency { Code = "UAH", Symbol = "₴" }
            };
        }

        public Currency GetCurrencyByCode(string code)
        {
            if (!currencies.Any(c => c.Code == code))
            {
                throw new ArgumentOutOfRangeException(nameof(code), "Invalid currency  code");
            }

            return currencies.FirstOrDefault(c => c.Code == code)!;
        }
    }
}
