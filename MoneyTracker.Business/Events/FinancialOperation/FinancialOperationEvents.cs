namespace MoneyTracker.Business.Events.FinancialOperation
{
    public record DebitTransactionAddedEvent(Guid OperationId, Guid UserId, string Title,
        string? Note, decimal Amount, Guid CategoryId, DateTime CreatedAt, Guid AccountId)
    : Event
    {
        public Guid Id { get; init; } = Guid.NewGuid();
    }

    public record CreditTransactionAddedEvent(Guid OperationId, Guid UserId, string Title,
        string? Note, decimal Amount, Guid CategoryId, DateTime CreatedAt, Guid AccountId)
        : Event
    {
        public Guid Id { get; init; } = Guid.NewGuid();
    }

    public record FinancialOperationCanceledEvent(Guid OperationId)
        : Event;

}
