namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public record AddDebitOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid ToAccountId);

    public record AddCreditOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid FromAccountId);

    public record AddTransferOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid FromAccountId, Guid ToAccountId);
    
    public record UpdateFinancialOperationCommand(Guid UserId, Guid OperationId, string Title, string? Note,
        decimal Amount, Guid CategoryId, DateTime CreatedAt);

    public record CancelFinancialOperationCommand(Guid TransactionId);
}
