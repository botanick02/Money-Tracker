using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface IMccCodeRepository
    {
        public string GetMccNameById(string code);
    }
}
