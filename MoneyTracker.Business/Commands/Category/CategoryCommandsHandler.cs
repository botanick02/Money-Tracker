using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;

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
            var data = new CreateCategoryData()
            {
                Name = command.Name,
                Type = command.Type,
            };
            

            var dataStr = JsonConvert.SerializeObject(data);

            var categoryCreatedEvent = new Event
            {
                Id = Guid.NewGuid(),
                StreamId = Guid.NewGuid(),
                Type = "CreateCategory",
                Version = 1,
                TimeStamp = DateTime.Now,
                Data = dataStr
            };

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }
    }

    public class CreateCategoryData
    {
        public string Name { get; set; }

        public string Type { get; set; }
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

            existingEvents = existingEvents.OrderByDescending(e => e.Version);

            var data = new UpdateCategoryNameData
            {
                Name = command.Name,
            };

            var dataStr = JsonConvert.SerializeObject(data);

            var categoryCreatedEvent = new Event
            {
                Id = Guid.NewGuid(),
                StreamId = Guid.Parse(command.Id),
                Type = "UpdateCategoryName",
                Version = existingEvents.First().Version + 1,
                TimeStamp = DateTime.Now,
                Data = dataStr
            };

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }

        public class UpdateCategoryNameData
        {
            public string Name { get; set; }
        }
    }
}
