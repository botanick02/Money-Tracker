using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class BudgetInputDto
    {
        public string Id { get; set; }
        public decimal Limit { get; set; } = 0;
        public string Title { get; set; }
        public string TimeScope { get; set; }
        public IEnumerable<string> CategoryId { get; set; }

        public Budget ToBudget()
        {
            var timeScope = this.TimeScope.ToLower() switch
            {
                "yearly" => Entities.TimeScope.yearly,
                "monthly" => Entities.TimeScope.monthly,
                "weekly" => Entities.TimeScope.weekly,
                "daily" => Entities.TimeScope.daily,
                _ => throw new NotImplementedException()
            };

            return new Budget(Id, Limit, CategoryId, Title, timeScope);
        }
    }
}
