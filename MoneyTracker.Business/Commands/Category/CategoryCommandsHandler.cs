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

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }
    }

    public class UpdateCategoryNameCommandHandler : ICommandHandler<UpdateCategoryNameCommand>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IEventStore eventStore;

        public UpdateCategoryNameCommandHandler(ICategoryRepository categoryRepository, IEventStore eventStore)
        {
            this.categoryRepository = categoryRepository;
            this.eventStore = eventStore;
        }

        public bool Handle(UpdateCategoryNameCommand command)
        {
            var existingCategory = categoryRepository.GetCategories().Find(c => c.Id == Guid.Parse(command.Id));

            if (existingCategory == null)
            {
                return false;
            }

            var categoryCreatedEvent = new CategoryNameUpdated
            {
                Id = Guid.Parse(command.Id),
                Name = command.Name,
            };

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }
    }
}
