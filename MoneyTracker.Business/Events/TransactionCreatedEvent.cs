using System;

namespace MoneyTracker.Business.Events
{
    public class TransactionCreatedEvent : IEvent
    {
        public Guid TransactionId { get; }
        public Guid UserId { get; }
        public string Title { get; }
        public string Note { get; }
        public decimal Amount { get; }
        public Guid CategoryId { get; }
        public DateTime DateTime { get; }
        public Guid AccountId { get; }

        public TransactionCreatedEvent(
            Guid transactionId,
            Guid userId,
            string title,
            string note,
            decimal amount,
            Guid categoryId,
            DateTime dateTime,
            Guid accountId)
        {
            TransactionId = transactionId;
            UserId = userId;
            Title = title;
            Note = note;
            Amount = amount;
            CategoryId = categoryId;
            DateTime = dateTime;
            AccountId = accountId;
        }
    }
}
