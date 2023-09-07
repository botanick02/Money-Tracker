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
        public Guid UserId { get; set; }
        public decimal Limit { get; set; } = 0;
        public string? Title { get; set; }
        public IEnumerable<Guid> CategoryId { get; set; }


        public Budget(IEnumerable<Guid> CategiryId) {
            this.CategoryId = CategiryId;
        }

        public Budget() { }

        public Budget(string id, decimal limit, IEnumerable<string> categoryId)
        {
            this.Id = Guid.Parse(id);
            this.Limit = limit;
            this.CategoryId = categoryId.Select(Guid.Parse);
        }
    }
}
