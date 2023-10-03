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
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, BudgetCreateEvent @event)
        {
            var updatedModel = currentModel;

            var newBudget = @event.Budget;

            updatedModel.Budgets.Add(newBudget);

            return updatedModel;
        }
    }
    public class BudgetDeleteEventApplier : IEventApplier<BudgetDeleteEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, BudgetDeleteEvent @event)
        {
            var updatedModel = currentModel;

            updatedModel.Budgets = updatedModel.Budgets.Where(x => x.Id != Guid.Parse(@event.id)).ToList();

            return updatedModel;
        }
    }
    public class BudgetEditEventApplier : IEventApplier<BudgetEditEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, BudgetEditEvent @event)
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
