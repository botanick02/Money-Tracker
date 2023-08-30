using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Services
{
    public class BudgetService
    {
        private readonly ITransactionRepository transactionRepository;
        private readonly IBudgetRepository budgetRepository;
        private readonly ICategoryRepository categoryRepository;
        public BudgetService(ITransactionRepository transaction, IBudgetRepository budget, ICategoryRepository categoryRepository)
        {
            this.transactionRepository = transaction;
            this.budgetRepository = budget;
            this.categoryRepository = categoryRepository;
        }

        public IEnumerable<BudgetDto> GetBudgets(Guid userId, DateTime? dateTimeTo = null) { 
            var budgets = budgetRepository.GetBudgets(userId, dateTimeTo);
            var categories = categoryRepository.GetCategories(userId, dateTimeTo);
            var transactions = transactionRepository.GetUserTransactions(userId, dateTimeTo);

            var res = budgets.Select((item) => {
                var category = categories.Where(x => item.CategoryId.Contains(x.Id));
                var spent = transactions.Where(x => item.CategoryId.Contains(x.CategoryId) && x.Amount < 0).Sum(x => x.Amount);
                return new BudgetDto(item, category, spent);
            });
            return res;
        }
    }
}
