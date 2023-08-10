using MoneyTracker.Business.Events.Budgets;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.Budget
{
    public class CreateBudgetCommandHandler : ICommandHandler<CreateBudgetCommand>
    {
        private readonly IEventStore eventStore;

        public CreateBudgetCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public async Task<bool> HandleAsync(CreateBudgetCommand command)
        {
            var budgetCreateEvent = new BudgetCreateEvent(command.Budget);
            await eventStore.AppendEventAsync(budgetCreateEvent);
            return true;
        }
    }

    public class DeleteBudgetCommandHandler : ICommandHandler<DeleteBudgetCommand>
    {
        private readonly IEventStore eventStore;

        public DeleteBudgetCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(DeleteBudgetCommand command)
        {
            var budgetCreateEvent = new BudgetDeleteEvent(command.id);
            eventStore.AppendEvent(budgetCreateEvent);
            return true;
        }
    }

    public class EditBudgetCommandHandler : ICommandHandler<EditBudgetCommand>
    {
        private readonly IEventStore eventStore;

        public EditBudgetCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public async Task<bool> HandleAsync(EditBudgetCommand command)
        {
            var budgetEditEvent = new BudgetEditEvent(command.Budget);
            await eventStore.AppendEventAsync(budgetEditEvent);
            return true;
        }
    }
}
