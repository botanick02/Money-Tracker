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
