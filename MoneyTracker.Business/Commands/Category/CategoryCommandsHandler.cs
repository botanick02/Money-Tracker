using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Category
{
    public class CreateCategoryCommandHandler : ICommandHandler<CreateCategoryCommand>
    {
        private readonly IEventStore eventStore;

        public CreateCategoryCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public async Task<bool> HandleAsync(CreateCategoryCommand command)
        {

            var categoryCreatedEvent = new CategoryCreatedEvent(
                CategoryId: Guid.NewGuid(),
                UserId: command.UserId,
                Name: command.Name,
                Type: command.Type,
                IconUrl: command.IconUrl,
                Color: command.Color
                );
            await eventStore.AppendEventAsync(categoryCreatedEvent);
            return true;
        }
    }

    public class UpdateCategoryCommandHandler : ICommandHandler<UpdateCategoryCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ICategoryRepository categoryRepository;

        public UpdateCategoryCommandHandler(IEventStore eventStore, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.categoryRepository = categoryRepository;
        }

        public async Task<bool> HandleAsync(UpdateCategoryCommand command)
        {
            var existingCategory = categoryRepository.GetCategoryById(command.CategoryId);

            if (existingCategory == null)
            {
                throw new ArgumentException($"CategoryId: {command.CategoryId} does not exist");
            }

            var eventsToAppend = new List<BaseEvent>();

            if (existingCategory.Name != command.Name)
            {
                eventsToAppend.Add(new CategoryNameUpdatedEvent(command.CategoryId, command.Name));
            }

            if (existingCategory.IconUrl != command.IconUrl)
            {
                eventsToAppend.Add(new CategoryIconUrlUpdatedEvent(command.CategoryId, command.IconUrl));
            }

            if (existingCategory.Color != command.Color)
            {
                eventsToAppend.Add(new CategoryColorUpdatedEvent(command.CategoryId, command.Color));
            }

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }


    public class DeactivateCategoryCommandHandler : ICommandHandler<DeactivateCategoryCommand>
    {
        private readonly IEventStore eventStore;

        public DeactivateCategoryCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public async Task<bool> HandleAsync(DeactivateCategoryCommand command)
        {
            var categoryDeleteEvent = new CategoryDeactivatedEvent(command.CategoryId);
            await eventStore.AppendEventAsync(categoryDeleteEvent);
            return true;
        }
    }
}