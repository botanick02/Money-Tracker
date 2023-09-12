using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;

namespace MoneyTracker.DataAccess.Repositories
{
    public class MccCodeRepository : IMccCodeRepository
    {
        private readonly IEnumerable<Currency> mccCodes;

        public MccCodeRepository()
        {
            var path = @"../MoneyTracker.DataAccess/Resources/MccCodes.json";
            var readMccCodes = JsonConvert.DeserializeObject<List<Currency>>(File.ReadAllText(path));
            if (readMccCodes == null)
            {
                throw new FileNotFoundException("MccCodes were failed to receive");
            }
            mccCodes = readMccCodes;
        }

        public Currency GetMccNameById(string code)
        {
            if (!mccCodes.Any(c => c.Code == code))
            {
                throw new ArgumentOutOfRangeException(nameof(code), "Invalid MCC code");
            }

            return mccCodes.FirstOrDefault(c => c.Code == code)!;
        }
    }
}