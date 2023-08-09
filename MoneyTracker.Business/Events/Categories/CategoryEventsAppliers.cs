using MoneyTracker.Business.Entities;
using MoneyTracker.Business.ReadStoreModel;
using MoneyTracker.Business.Services;

namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryNameUpdatedEventApplier : IEventApplier<CategoryNameUpdatedEvent>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryNameUpdatedEvent @event)
        {
            var updatedModel = currentmodel;

            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.Id);
            if (categoryToUpdate != null)
            {
                categoryToUpdate.Name = @event.Name;
            }

            return updatedModel;
        }
    }

    public class CategoryCreatedEventApplier : IEventApplier<CategoryCreatedEvent>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryCreatedEvent @event)
        {
            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Append(@event.category);

            return updatedModel;
        }
    }

    public class CategoryEditEventApplier : IEventApplier<CategoryEditEvent>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryEditEvent @event)
        {
            var updatedModel = currentmodel;


            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.category.Id);
            if (categoryToUpdate != null)
            {
                ObjectValueChangeService.ObjectValueChange(@event.category, ref categoryToUpdate);
            }

            return updatedModel;
        }
    }

    public class CategoryDeleteEventApplier : IEventApplier<CategoryDeleteEvent>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryDeleteEvent @event)
        {
            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Where(item => item.Id != Guid.Parse(@event.id));
            return updatedModel;
        }
    }
}
