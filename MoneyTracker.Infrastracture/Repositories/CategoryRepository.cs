using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System.Diagnostics;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Infrastracture.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IEventStore eventStore;
        public CategoryRepository(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }
        public Category GetCategoryById(Guid id)
        {
            return eventStore.AggregateStream(id, new Category(), Evolve);
        }

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
