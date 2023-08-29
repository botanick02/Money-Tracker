using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Interfaces
{
    public interface IBudgetRepository
    {
        public IEnumerable<Budget> GetBudgets(Guid userId, DateTime? dateTimeTo = null);
    }
}
