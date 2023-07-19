using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.DataAccess
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public CategoryRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public List<Category> GetCategories(DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Categories.ToList();
        }

    }
}
