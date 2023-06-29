using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services;
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
        public Category GetCategoryById(Guid id, int? version = null)
        {
            return eventStore.AggregateStream(id, new Category(), CategoryService.Evolve, version);
        }

    }
}
