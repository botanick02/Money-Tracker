using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System;

namespace MoneyTracker.DataAccess.Repositories
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

        public Category? GetCategoryById(Guid id)
        {
            var readModel = readModelExtensions.GetReadModel();
            return readModel.Categories.FirstOrDefault(c => c.Id == id);
        }

        public Category GetTransferCategory()
        {
            var readModel = readModelExtensions.GetReadModel();
            return readModel.Categories.FirstOrDefault(c => c.Type == "transfer");
        }
    }
}
