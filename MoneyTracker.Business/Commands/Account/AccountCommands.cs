using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Commands.Account
{
    public record CreatePersonalAccountCommand(Guid UserId, string Name, Currency Currency);


    public record UpdatePersonalAccountCommand(string AccountId,Guid UserId, string Name);



    public record DeactivatePersonalAccountCommand(string AccountId);
}
