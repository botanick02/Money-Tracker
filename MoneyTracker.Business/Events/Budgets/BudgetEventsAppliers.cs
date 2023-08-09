using MoneyTracker.Business.ReadStoreModel;
using MoneyTracker.Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Events.Budgets
{
    public class BudgetCreateEventApplier : IEventApplier<BudgetCreateEvent>
    {
        public ReadModel Apply(ReadModel currentModel, BudgetCreateEvent @event)
        {
            var updatedModel = currentModel;

            var newBudget = @event.Budget;

            updatedModel.Budgets = updatedModel.Budgets.Append(newBudget);

            return updatedModel;
        }
    }
    public class BudgetDeleteEventApplier : IEventApplier<BudgetDeleteEvent>
    {
        public ReadModel Apply(ReadModel currentModel, BudgetDeleteEvent @event)
        {
            var updatedModel = currentModel;

            updatedModel.Budgets = updatedModel.Budgets.Where(x => x.Id != Guid.Parse(@event.id));

            return updatedModel;
        }
    }
    public class BudgetEditEventApplier : IEventApplier<BudgetEditEvent>
    {
        public ReadModel Apply(ReadModel currentModel, BudgetEditEvent @event)
        {
            var updatedModel = currentModel;

            var budgetToEdit = updatedModel.Budgets.FirstOrDefault(c => c.Id == @event.Budget.Id);
            if (budgetToEdit != null)
            {
                ObjectValueChangeService.ObjectValueChange(@event.Budget, ref budgetToEdit);
            }

            return updatedModel;
        }
    }
}
