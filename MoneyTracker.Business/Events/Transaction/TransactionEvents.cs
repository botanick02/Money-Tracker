namespace MoneyTracker.Business.Events.Transaction
{
    public class TransactionEvents
    {
        public record DebitTransactionAddedEvent
        {
            public Guid Id { get; set; } = Guid.NewGuid();

            public Guid TransactionId { get; set; }

            public Guid UserId { get; set; }

            public string Title { get; set; }

            public string? Note { get; set; }

            public decimal Amount { get; set; }

            public Guid CategoryId { get; set; }

            public DateTime CreatedAt { get; set; }

            public Guid AccountId { get; set; }
        }

        public record CreditTransactionAddedEvent
        {
            public Guid Id { get; set; } = Guid.NewGuid();

            public Guid TransactionId { get; set; }

            public Guid UserId { get; set; }

            public string Title { get; set; }

            public string? Note { get; set; }

            public decimal Amount { get; set; }

            public Guid CategoryId { get; set; }

            public DateTime CreatedAt { get; set; }

            public Guid AccountId { get; set; }
        }

        public record TransactionCanceledEvent
        {
            public Guid TransactionId { get; set;}

        }
    }
}
