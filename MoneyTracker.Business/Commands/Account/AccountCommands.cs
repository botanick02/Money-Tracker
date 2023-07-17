namespace MoneyTracker.Business.Commands.Account
{
    public record CreatePersonalAccount(Guid UserId, string Name);
}
