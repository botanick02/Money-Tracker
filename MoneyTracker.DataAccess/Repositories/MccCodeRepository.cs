using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;

namespace MoneyTracker.DataAccess.Repositories
{
    public class MccCodeRepository : IMccCodeRepository
    {
        private readonly IEnumerable<MccCode> mccCodes;

        public MccCodeRepository()
        {
            var path = @"./Resources/MccCodes.json";
            var readMccCodes = JsonConvert.DeserializeObject<List<MccCode>>(File.ReadAllText(path));
            if (readMccCodes == null)
            {
                throw new FileNotFoundException("MccCodes were failed to receive");
            }
            mccCodes = readMccCodes;
        }

        public MccCode GetMccById(string id)
        {
            if (!mccCodes.Any(c => c.Mcc == id))
            {
                throw new ArgumentOutOfRangeException(nameof(id), "Invalid MCC code");
            }

            return mccCodes.FirstOrDefault(c => c.Mcc == id)!;
        }
    }
}