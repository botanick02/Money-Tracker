namespace MoneyTracker.Business.Events.Categories
{
    public record CategoryCreatedEvent(Guid UserId, string Name, string Type, string IconUrl, string Color)
        : Event;

    public record CategoryDeleteEvent(Guid id)
        : Event;

    public record CategoryNameUpdatedEvent(Guid CategoryId, string Name)
        : Event;
    
    public record CategoryColorUpdatedEvent(Guid CategoryId, string Color)
        : Event;
    
    public record CategoryIconUrlUpdatedEvent(Guid CategoryId, string IconUrl)
        : Event;
}