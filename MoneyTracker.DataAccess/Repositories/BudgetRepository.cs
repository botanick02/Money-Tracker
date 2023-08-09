using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;


namespace MoneyTracker.DataAccess.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly ReadModelExtensions readModelExtensions;

        public BudgetRepository(ReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public IEnumerable<Budget> GetBudgets(DateTime? dateTimeTo = null)
        {
            var readModel = readModelExtensions.GetReadModel(dateTimeTo);
            return readModel.Budgets.ToList();
        }
    }
}
