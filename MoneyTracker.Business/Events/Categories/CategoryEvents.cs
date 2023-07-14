namespace MoneyTracker.Business.Events.Categories
{
    public record CategoryCreatedEvent(Guid Id, string Name, string Type)
    : Event;

    public record CategoryNameUpdatedEvent(Guid Id, string Name)
        : Event;
}