using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class GetTransactionsDataDto
    {
        public List<TransactionDto> Transactions { get; set; } = new List<TransactionDto>();

        public decimal Incomes { get; set; }

        public decimal Expenses { get; set;}
    }
}
