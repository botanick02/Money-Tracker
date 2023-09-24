using MoneyTracker.Business.Entities;
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
                DateTime startDate = item.TimeScope switch
                {
                    TimeScope.daily => DateTime.Today,
                    TimeScope.weekly => DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek),
                    TimeScope.monthly => new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1),
                    TimeScope.yearly => new DateTime(DateTime.Today.Year, 1, 1),
                    _ => throw new ArgumentOutOfRangeException(nameof(item.TimeScope), item.TimeScope, null)
                };

                var category = categories.Where(x => item.CategoryId.Contains(x.Id));
                var spent = transactions.Where(x => x.CreatedAt >= startDate && item.CategoryId.Contains(x.CategoryId) && x.Amount < 0).Sum(x => x.Amount);
                return new BudgetDto(item, category, spent);
            });
            return res;
        }
    }
}
