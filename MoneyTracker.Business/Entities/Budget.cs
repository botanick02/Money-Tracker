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
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Limit { get; set; }
        public bool IsActive { get; set; }
        public Guid CategoryId { get; set; }

    }
}
