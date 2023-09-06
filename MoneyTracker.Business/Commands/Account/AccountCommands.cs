namespace MoneyTracker.Business.Commands.Account
{
    public record CreatePersonalAccountCommand(Guid UserId, string Name);


    public record UpdatePersonalAccountCommand(Guid UserId, string Name, string AccountId);



    public record DeactivatePersonalAccountCommand(Guid UserId,string AccountId);
}
