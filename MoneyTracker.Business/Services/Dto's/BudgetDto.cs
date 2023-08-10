using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class BudgetDto
    {
        public Guid Id { get; set; }
        public decimal Limit { get; set; }
        public string? Title { get; set; }
        public Category Category { get; set; }
        public decimal Spent { get; set; }

        public BudgetDto(Budget budget, Category category, decimal spent)
        {
            Id = budget.Id;
            Limit = budget.Limit;
            Category = category;
            Spent = spent;
            Title = budget.Title;
        }

    }
}
