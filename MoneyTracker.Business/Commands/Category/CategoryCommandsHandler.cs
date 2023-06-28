using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Business.Commands.Category
{

    public class CreateCategoryCommandHandler : ICommandHandler<CreateCategoryCommand>
    {
        private readonly IEventStore eventStore;

        public CreateCategoryCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(CreateCategoryCommand command)
        {

            var categoryId = Guid.NewGuid();

            var categoryCreatedEvent = new CategoryCreated
            {
                Id = categoryId,
                Name = command.Name,
                Type = command.Type,
            };

            eventStore.AppendEvent(categoryId, categoryCreatedEvent);

            return true;
        }
    }

    public class UpdateCategoryNameCommandHandler : ICommandHandler<UpdateCategoryNameCommand>
    {
        private readonly IEventStore eventStore;

        public UpdateCategoryNameCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(UpdateCategoryNameCommand command)
        {
            var existingEvents = eventStore.GetEventsByAggregateId(Guid.Parse(command.Id));

            if (!existingEvents.Any())
            {
                return false;
            }

            var streamId = Guid.Parse(command.Id);

            var categoryCreatedEvent = new CategoryNameUpdated
            {
                Name = command.Name,
            };

            eventStore.AppendEvent(streamId, categoryCreatedEvent);

            return true;
        }
    }
}
