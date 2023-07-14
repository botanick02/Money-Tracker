namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public record AddFinancialOperationCommand(Guid UserId, string Title, string? Note,
        decimal Amount, Guid CategoryId, Guid FromAccountId, Guid ToAccountId);

    public record CancelFinancialOperationCommand(Guid TransactionId);
}
