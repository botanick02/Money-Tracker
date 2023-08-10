using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Categories
{
    public record CategoryCreatedEvent(Category category)
        : Event;

    public record CategoryDeleteEvent(string id)
        : Event;
    public record CategoryEditEvent(Category category)
        : Event;

    public record CategoryNameUpdatedEvent(Guid Id, string Name)
        : Event;
}