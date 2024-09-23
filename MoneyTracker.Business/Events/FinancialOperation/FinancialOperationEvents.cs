namespace MoneyTracker.Business.Events.FinancialOperation
{
    public record DebitTransactionAddedEvent(Guid OperationId, Guid UserId, string Title,
        string? Note, decimal Amount, Guid CategoryId, DateTime CreatedAt, Guid AccountId)
    : BaseEvent
    {
        public Guid Id { get; init; } = Guid.NewGuid();
    }

    public record CreditTransactionAddedEvent(Guid OperationId, Guid UserId, string Title,
        string? Note, decimal Amount, Guid CategoryId, DateTime CreatedAt, Guid AccountId)
        : BaseEvent
    {
        public Guid Id { get; init; } = Guid.NewGuid();
    }

    public record FinancialOperationCanceledEvent(Guid OperationId)
        : BaseEvent;

    public record FinancialOperationAmountUpdatedEvent(Guid OperationId, decimal Amount)
        : BaseEvent;

    public record FinancialOperationTitleUpdatedEvent(Guid OperationId, string Title)
        : BaseEvent;

    public record FinancialOperationCategoryIdUpdatedEvent(Guid OperationId, Guid CategoryId)
        : BaseEvent;

    public record FinancialOperationNoteUpdatedEvent(Guid OperationId, string? Note)
        : BaseEvent;

    public record FinancialOperationCreatedAtUpdatedEvent(Guid OperationId, DateTime CreatedAt)
        : BaseEvent;
    
    public record FinancialOperationAccountUpdatedEvent(Guid TransactionId, Guid AccountId)
        : BaseEvent;

}
