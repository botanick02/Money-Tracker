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

    public record FinancialOperationAmountUpdatedEvent(Guid OperationId, decimal Amount)
        : Event;

    public record FinancialOperationTitleUpdatedEvent(Guid OperationId, string Title)
        : Event;

    public record FinancialOperationCategoryIdUpdatedEvent(Guid OperationId, Guid CategoryId)
        : Event;

    public record FinancialOperationNoteUpdatedEvent(Guid OperationId, string? Note)
        : Event;

    public record FinancialOperationCreatedAtUpdatedEvent(Guid OperationId, DateTime CreatedAt)
        : Event;
    
    public record FinancialOperationAccountUpdatedEvent(Guid TransactionId, Guid AccountId)
        : Event;

}
