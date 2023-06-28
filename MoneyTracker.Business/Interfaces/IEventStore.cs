using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent(Event @event);

        public IEnumerable<Event> GetEventsByAggregateId(Guid aggregateId);

        public IEnumerable<Event> GetEventsByType(string type);

        public T AggregateStream<T>(Guid streamId, T @default, Func<T, Event, T> evolve);
    }
}
