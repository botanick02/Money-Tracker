using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;


namespace MoneyTracker.DataAccess.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly IReadModelExtensions readModelExtensions;

        public BudgetRepository(IReadModelExtensions readModelExtensions)
        {
            this.readModelExtensions = readModelExtensions;
        }

        public IEnumerable<Budget> GetBudgets(DateTime? dateTimeTo = null, IReadModelExtensions? readModelExtensionsScoped = null)
        {
            var modelExtensions = readModelExtensionsScoped ?? readModelExtensions;

            var readModel = modelExtensions.GetReadModel(dateTimeTo);
            return readModel.Budgets.ToList();
        }
    }
}
