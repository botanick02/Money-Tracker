using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class GetTransactionsDto
    {
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();

        public decimal Incomes { get; set; }

        public decimal Expenses { get; set;}
    }
}
