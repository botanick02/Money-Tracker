using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MoneyTracker.Business.Entities
{

    public enum TimeScope
    {
        daily,
        weekly,
        monthly,
        yearly
    }

    public class Budget
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public decimal Limit { get; set; } = 0;
        public string Title { get; set; }
        public IEnumerable<Guid> CategoryId { get; set; }
        public TimeScope TimeScope { get; set; } = TimeScope.monthly;

        public Budget() { }

        private Budget(string id, decimal limit, IEnumerable<string> categoryId, string title)
        {
            Id = id.Length > 0 ? Guid.Parse(id) : Guid.NewGuid();
            Limit = limit;
            CategoryId = categoryId.Select(Guid.Parse);
            Title = title;
        }

        public Budget(string id, decimal limit, IEnumerable<string> categoryId, string title, TimeScope timeScope) 
            : this(id, limit, categoryId, title)
        {
            TimeScope = timeScope;
        }

        public Budget(string id, decimal limit, IEnumerable<string> categoryId, string title, string timeScope) 
            : this(id, limit, categoryId, title)
        {
            //TimeScope = (TimeScope)Enum.Parse(typeof(TimeScope), timeScope);
            TimeScope = timeScope switch
            {
                "yearly" => TimeScope.yearly,
                "monthly" => TimeScope.monthly,
                "weekly" => TimeScope.weekly,
                "daily" => TimeScope.daily,
                _ => throw new NotImplementedException()
            };
        }
    }
}
