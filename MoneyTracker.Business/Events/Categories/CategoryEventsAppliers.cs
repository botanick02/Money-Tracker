using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryNameUpdatedEventApplier : IEventApplier<CategoryNameUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryNameUpdatedEvent @event)
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
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryCreatedEvent @event)
        {
            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Append(@event.category);

            return updatedModel;
        }
    }

    public class CategoryDeleteEventApplier : IEventApplier<CategoryDeleteEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryDeleteEvent @event)
        {
            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Where(item => item.Id != Guid.Parse(@event.id));
            return updatedModel;
        }
    }
}
