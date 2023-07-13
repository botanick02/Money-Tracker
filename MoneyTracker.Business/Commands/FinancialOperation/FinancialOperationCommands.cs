namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public class FinancialOperationCommands
    {
        public class AddFinancialOperation
        {
            public Guid UserId { get; set; }

            public string Title { get; set; }

            public string? Note { get; set; }

            public decimal Amount { get; set; }

            public Guid CategoryId { get; set; }

            public Guid FromAccountId { get; set; }

            public Guid ToAccountId { get; set; }
        }

        public class CancelFinancialOperation
        {
            public Guid TransactionId { get; set; }
        }
    }
}
