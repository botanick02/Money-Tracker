using MoneyTracker.Business.Entities;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryNameUpdatedEventApplier : IEventApplier<CategoryNameUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryNameUpdatedEvent @event)
        {
            var updatedModel = currentmodel;

            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.CategoryId);
            if (categoryToUpdate != null)
            {
                categoryToUpdate.Name = @event.Name;
            }

            return updatedModel;
        }
    }

    public class CategoryColorUpdatedEventApplier : IEventApplier<CategoryColorUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryColorUpdatedEvent @event)
        {
            var updatedModel = currentmodel;

            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.CategoryId);
            if (categoryToUpdate != null)
            {
                categoryToUpdate.Color = @event.Color;
            }

            return updatedModel;
        }
    }

    public class CategoryIconUrlUpdatedEventApplier : IEventApplier<CategoryIconUrlUpdatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryIconUrlUpdatedEvent @event)
        {
            var updatedModel = currentmodel;

            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.CategoryId);
            if (categoryToUpdate != null)
            {
                categoryToUpdate.IconUrl = @event.IconUrl;
            }

            return updatedModel;
        }
    }

    public class CategoryCreatedEventApplier : IEventApplier<CategoryCreatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryCreatedEvent @event)
        {
            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Append(
                new Category { 
                    Id = @event.CategoryId,
                    UserId = @event.UserId,
                    Name = @event.Name,
                    Color = @event.Color,
                    IconUrl = @event.IconUrl,
                    Type = @event.Type
                });

            return updatedModel;
        }
    }

    public class CategoryDeactivatedEventApplier : IEventApplier<CategoryDeactivatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, CategoryDeactivatedEvent @event)
        {
            var updatedModel = currentmodel;

            var categoryToUpdate = updatedModel.Categories.FirstOrDefault(c => c.Id == @event.CategoryId);
            if (categoryToUpdate != null)
            {
                categoryToUpdate.IsActive = false;
            }

            return updatedModel;
        }
    }
}
