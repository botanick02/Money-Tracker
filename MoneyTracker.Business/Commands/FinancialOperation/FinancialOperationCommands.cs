namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public record AddDebitOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid ToAccountId, DateTime? CreatedAt);

    public record AddCreditOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid FromAccountId, DateTime? CreatedAt);

    public record AddTransferOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid FromAccountId, Guid ToAccountId, DateTime? CreatedAt);
    
    public record UpdateFinancialOperationCommand(Guid UserId, Guid OperationId, string Title, string? Note,
        decimal Amount, Guid CategoryId, DateTime CreatedAt, Guid? FromAccountId, Guid? ToAccountId);

    public record CancelFinancialOperationCommand(Guid TransactionId);
}
