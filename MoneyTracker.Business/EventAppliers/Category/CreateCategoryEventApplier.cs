using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Business.EventAppliers.Category
{
    public class CategoryCreatedEventApplier : IEventApplier<CategoryCreated>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryCreated @event)
        {
            var newCategory = new Entities.Category()
            {
                Id = @event.Id,
                Name = @event.Name,
                Type = @event.Type,
            };

            var updatedModel = currentmodel;
            updatedModel.Categories.Add(newCategory);

            return updatedModel;
        }
    }
}
