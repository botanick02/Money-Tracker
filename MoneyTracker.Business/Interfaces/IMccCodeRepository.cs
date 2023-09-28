using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IMccCodeRepository
    {
        public MccCode GetMccById(string id);
    }
}
