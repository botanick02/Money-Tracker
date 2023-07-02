using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Business.EventAppliers.Category
{
    public class CategoryNameUpdatedEventApplier : IEventApplier<CategoryNameUpdated>
    {
        public ReadModel Apply(ReadModel currentmodel, CategoryNameUpdated @event)
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
}
