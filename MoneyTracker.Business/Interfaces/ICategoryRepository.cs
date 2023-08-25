using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ICategoryRepository
    {
        public List<Category> GetCategories(Guid userId, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null);

        public Category? GetCategoryById(Guid id, IReadModelExtensions? readModelExtensionsScoped = null);

        public Category GetTransferCategory(Guid userId, IReadModelExtensions? readModelExtensionsScoped = null);

        public DefaultCategories GetDefaultCategories();
    }

    public class DefaultCategories
    {
        public List<CategoryMin> ExpenseCategories { get; set; } = new List<CategoryMin>();

        public List<CategoryMin> IncomeCategories { get; set; } = new List<CategoryMin>();
    }

    public class CategoryMin
    {
        public string Name { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }
    }
}
