using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Events.Budgets;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Commands.Budget
{
    public class CreateBudgetCommandHandler : ICommandHandler<CreateBudgetCommand>
    {
        private readonly IEventStore eventStore;

        public CreateBudgetCommandHandler(IEventStore eventStore)
        {
            this.eventStore = eventStore;
        }

        public bool Handle(CreateBudgetCommand command)
        {
            var budgetCreateEvent = new BudgetCreateEvent(command.Budget);
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

        public bool Handle(EditBudgetCommand command)
        {
            var budgetEditEvent = new BudgetEditEvent(command.Budget);
            eventStore.AppendEvent(budgetEditEvent);
            return true;
        }
    }
}
