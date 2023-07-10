namespace MoneyTracker.Business.Commands.Transaction
{
    public class TransactionCommands
    {
        public class AddTransactionCommand
        {
            public Guid UserId { get; set; }

            public string Title { get; set; }

            public string? Note { get; set; }

            public decimal Amount { get; set; }

            public Guid CategoryId { get; set; }

            public Guid FromAccountId { get; set; }

            public Guid ToAccountId { get; set; }
        }

        public class CancelTransactionCommand
        {
            public Guid DebitTransactionId { get; set; }

            public Guid DepositTransactionId { get; set; }
        }
    }
}
