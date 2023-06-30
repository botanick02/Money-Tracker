using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Infrastracture.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ReadModelExtensions readModelExtensions;
        public CategoryRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public List<Category> GetCategories()
        {
            var readModel = readModelExtensions.GetReadModel();
            return readModel.Categories;
        }

    }
}
