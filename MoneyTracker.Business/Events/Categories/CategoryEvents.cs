using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Events.Categories
{
    public record CategoryCreatedEvent(Guid CategoryId, Guid UserId, string Name, TransactionTypes Type, string IconUrl, string Color)
        : BaseEvent;

    public record ServiceCategoryCreatedEvent(Guid CategoryId, string Name, TransactionTypes Type, string IconUrl, string Color)
        : BaseEvent;

    public record CategoryDeactivatedEvent(Guid CategoryId)
        : BaseEvent;

    public record CategoryNameUpdatedEvent(Guid CategoryId, string Name)
        : BaseEvent;
    
    public record CategoryColorUpdatedEvent(Guid CategoryId, string Color)
        : BaseEvent;
    
    public record CategoryIconUrlUpdatedEvent(Guid CategoryId, string IconUrl)
        : BaseEvent;
}