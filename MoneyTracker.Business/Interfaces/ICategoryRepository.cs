using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ICategoryRepository
    {
        public List<Category> GetCategories(DateTime? dateTimeTo = null);

        public Category GetTransferCategory();
    }
}
