using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Account
{
    public record DebitAccountCreatedEvent(Guid Id, Guid UserId, Currency Currency) : Event;

    public record CreditAccountCreatedEvent(Guid Id, Guid UserId, Currency Currency) : Event;

    public record PersonalAccountCreatedEvent(Guid Id, Guid UserId, string Name, Currency Currency) : Event;

}
