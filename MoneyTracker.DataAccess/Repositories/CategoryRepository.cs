using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;
using System;
using System.IO;

namespace MoneyTracker.DataAccess.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IReadModelExtensions readModelExtensions;
        private string defaultCategoriesPath = @"../MoneyTracker.DataAccess/Resources/DefaultCategories.json";
        public CategoryRepository(IReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }
        public List<Category> GetCategories(Guid userId, DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Categories.Where(c => c.UserId == userId).ToList();
        }

        public Category? GetCategoryById(Guid id, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel();
            return readModel.Categories.FirstOrDefault(c => c.Id == id);
        }

        public DefaultCategories GetDefaultCategories()
        {
            var categories = JsonConvert.DeserializeObject<DefaultCategories>(File.ReadAllText(defaultCategoriesPath));
            if (categories == null)
            {
                throw new FileNotFoundException("Currencies were failed to receive");
            }
            return categories;
        }

        public Category GetTransferCategory(Guid userId, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel();
            return readModel.Categories.Where(c => c.UserId == userId).FirstOrDefault(c => c.Type == "transfer");
        }
    }
}