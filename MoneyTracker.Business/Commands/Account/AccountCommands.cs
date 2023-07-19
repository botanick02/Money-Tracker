namespace MoneyTracker.Business.Commands.Account
{
    public record CreatePersonalAccountCommand(Guid UserId, string Name);
}
