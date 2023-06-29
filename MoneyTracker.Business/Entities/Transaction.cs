using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserId { get; set; }

        public string Title { get; set; }

        public string Note { get; set; }

        public decimal Amount { get; set; }

        public Guid CategoryId { get; set; }

        public DateTime DateTime { get; set; }

        public Guid AccountId { get; set; }
    }
}
