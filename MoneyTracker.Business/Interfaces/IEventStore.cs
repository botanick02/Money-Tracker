using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        void AppendEvent<TEvent>(TEvent _event) where TEvent : IEvent;
        IEnumerable<TEvent> GetEventsByAggregateId<TEvent>(Guid aggregateId) where TEvent : class;
    }
}