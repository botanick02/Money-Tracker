using MoneyTracker.Business.Entities;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Business.Services
{
    public class CategoryService
    {

        public static Category Evolve(Category category, object @event)
        {
            return @event switch
            {
                CategoryCreated categoryCreated =>
                    Create(categoryCreated),
                CategoryNameUpdated categoryNameUpdated =>
                    Apply(category, categoryNameUpdated),
            };
        }


        private static Category Create(CategoryCreated @event)
        {
            return new Category()
            {
                Id = @event.Id,
                Name = @event.Name,
                Type = @event.Type,
            };
        }

        private static Category Apply(Category category, CategoryNameUpdated @event)
        {
            var updatedCategory = category;
            updatedCategory.Name = @event.Name;
            return updatedCategory;
        }

    }
}
