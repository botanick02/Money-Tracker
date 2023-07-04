using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;
using System.Runtime.Serialization;
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

            var categoryCreatedEvent = new CategoryCreatedEvent
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
            var existingCategory = categoryRepository.GetCategories().Find(c => c.Id == command.Id);

            if (existingCategory == null)
            {
                throw new CategoryNotFoundException("Category to update was not found");
            }

            var categoryCreatedEvent = new CategoryNameUpdatedEvent
            {
                Id = command.Id,
                Name = command.Name,
            };

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }

    }

    [Serializable]
    public class CategoryNotFoundException : Exception
    {
        public CategoryNotFoundException(string message)
        {
        }

        protected CategoryNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
