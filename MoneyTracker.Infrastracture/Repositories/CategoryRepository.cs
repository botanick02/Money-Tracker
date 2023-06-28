using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;
using static MoneyTracker.Business.Commands.Category.UpdateCategoryNameCommandHandler;

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
            return eventStore.AggregateStream<Category>(id, new Category(), CategoryRepository.Evolve);
        }

        public static Category Evolve(Category category, Event @event)
        {
            switch (@event.Type)
            {
                case "CreateCategory":
                    return Create(@event);

                case "UpdateCategoryName":
                    return UpdateCategoryName(category, @event);

                default: break;
            }

            return null;
        }


        public static Category Create(Event @event)
        {
            var data = JsonConvert.DeserializeObject<CreateCategoryData>(@event.Data);

            return new Category()
            {
                Id = @event.StreamId,
                Name = data.Name,
                Type = data.Type,
            };
        }

        public static Category UpdateCategoryName(Category category, Event @event)
        {
            var data = JsonConvert.DeserializeObject<UpdateCategoryNameData>(@event.Data);

            var updatedCategory = category;
            updatedCategory.Name = data.Name;
            return updatedCategory;
        }
    }
}
