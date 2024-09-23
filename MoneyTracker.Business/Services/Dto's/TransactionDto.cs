using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class TransactionDto
    {
        public Guid Id { get; set; }

        public Guid OperationId { get; set; }

        public Guid UserId { get; set; }

        public string? Title { get; set; }

        public string? Note { get; set; }

        public decimal Amount { get; set; }

        public Category Category { get; set; }

        public Guid CategoryId { get; set; }

        public DateTime CreatedAt { get; set; }

        public Guid? AccountId { get; set; }

        public Guid? FromAccountId { get; set; }

        public string? AccountName { get; set; }
    }
}
