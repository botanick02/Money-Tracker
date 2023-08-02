using MoneyTracker.Business.Events.Budgets;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Interfaces;
using System.Runtime.Serialization;

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

            var categoryCreatedEvent = new CategoryCreatedEvent(command.category);
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
            (
                Id: command.Id,
                Name: command.Name
            );

            eventStore.AppendEvent(categoryCreatedEvent);

            return true;
        }

    }

    public class DeleteCategoryCommandHandler : ICommandHandler<DeleteCategoryCommand>
    {
        private readonly IEventStore eventStore;

        public DeleteCategoryCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(DeleteCategoryCommand command)
        {

            var categoryDeleteEvent = new CategoryDeleteEvent(command.Id);
            eventStore.AppendEvent(categoryDeleteEvent);
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