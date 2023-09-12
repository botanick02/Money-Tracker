using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IMccCodeRepository
    {
        public Currency GetMccNameById(string code);
    }
}
