﻿using MoneyTracker.Business.ReadStoreModel;

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
            var newCategory = new Entities.Category()
            {
                Id = @event.Id,
                Name = @event.Name,
                Type = @event.Type,
            };

            var updatedModel = currentmodel;
            updatedModel.Categories = updatedModel.Categories.Append(newCategory);

            return updatedModel;
        }
    }
}