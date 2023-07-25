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
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Limit { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public Guid CategoryId { get; set; }

        public Budget(Guid CategiryId) {
            this.CategoryId = CategiryId;
        }
    }
}
