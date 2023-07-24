using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.DataAccess
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
            return readModel.Budgets;
        }
    }
}
