using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Categories
{
    public record CategoryCreatedEvent(Guid CategoryId, Guid UserId, string Name, TransactionTypes Type, string IconUrl, string Color)
        : Event;

    public record ServiceCategoryCreatedEvent(Guid CategoryId, string Name, TransactionTypes Type, string IconUrl, string Color)
        : Event;

    public record CategoryDeactivatedEvent(Guid CategoryId)
        : Event;

    public record CategoryNameUpdatedEvent(Guid CategoryId, string Name)
        : Event;
    
    public record CategoryColorUpdatedEvent(Guid CategoryId, string Color)
        : Event;
    
    public record CategoryIconUrlUpdatedEvent(Guid CategoryId, string IconUrl)
        : Event;
}