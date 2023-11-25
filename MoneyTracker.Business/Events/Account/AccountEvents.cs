using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Account
{
    public record DebitAccountCreatedEvent(Guid AccountId, Guid UserId, Currency Currency) : BaseEvent;

    public record CreditAccountCreatedEvent(Guid AccountId, Guid UserId, Currency Currency) : BaseEvent;

    public record PersonalAccountCreatedEvent(Guid AccountId, Guid UserId, string Name, Currency Currency, bool IsActive) : BaseEvent;
    public record PersonalAccountDeactivatedEvent(Guid AccountId) : BaseEvent;
    public record UpdatePersonalAccountEvent(Guid AccountId, string Name) : BaseEvent;


}
