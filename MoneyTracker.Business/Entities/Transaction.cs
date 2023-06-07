using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoneyTracker.Business.Entities.Enums;

namespace MoneyTracker.Business.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public decimal Amount { get; set; }

        public string? Description { get; set; }

        public TransactionType Type { get; set; }

        public int CategoryId { get; set; }

        public int PlaceId { get; set; }

        public int WalletId { get; set; }
    }
}
