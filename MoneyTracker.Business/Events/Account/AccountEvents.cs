using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Account
{
    public record DebitAccountCreatedEvent(Guid AccountId, Guid UserId, Currency Currency) : Event;

    public record CreditAccountCreatedEvent(Guid AccountId, Guid UserId, Currency Currency) : Event;

    public record PersonalAccountCreatedEvent(Guid AccountId, Guid UserId, string Name, Currency Currency, bool IsActive) : Event;
    public record PersonalAccountDeactivatedEvent(Guid AccountId) : Event;
    public record UpdatePersonalAccountCommand(Guid AccountId, Guid UserId, string Name, Currency Currency) : Event;


}
