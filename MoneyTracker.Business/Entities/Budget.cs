using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MoneyTracker.Business.Entities
{
    public class Budget
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public decimal Limit { get; set; } = 0;
        public string? Title { get; set; }
        public Guid CategoryId { get; set; }

        public Budget(Guid CategiryId) {
            this.CategoryId = CategiryId;
        }

        public Budget() { }

        public Budget(string id, decimal limit, string categoryId)
        {
            this.Id = Guid.Parse(id);
            this.Limit = limit;
            this.CategoryId = Guid.Parse(categoryId);
        }
    }
}
