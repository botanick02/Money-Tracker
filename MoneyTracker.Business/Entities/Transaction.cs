namespace MoneyTracker.Business.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid OperationId { get; set; }

        public Guid UserId { get; set; }

        public string? Title { get; set; }

        public string? Note { get; set; }

        public decimal Amount { get; set; }

        public Guid CategoryId { get; set; }

        public DateTime CreatedAt { get; set; }

        public Guid AccountId { get; set; }
    }
}
