using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private List<Event> eventStore = new List<Event>();

        public T AggregateStream<T>(Guid streamId, T @default, Func<T, Event, T> evolve)
        {
            var events = GetEventsByAggregateId(streamId).OrderBy(e => e.Version);

            var aggregate = @default;

            foreach (var @event in events)
            {
                aggregate = evolve(aggregate, @event);
            }

            return aggregate;
        }

        public void AppendEvent(Event @event)
        {
            eventStore.Add(@event);
        }

        public IEnumerable<Event> GetEventsByAggregateId(Guid aggregateId)
        {
            var events = new List<Event>();

            foreach (var @event in eventStore)
            {
                if (@event.StreamId == aggregateId)
                {
                    events.Add(@event);
                }
            }

            return events;
        }

        public IEnumerable<Event> GetEventsByType(string type)
        {
            var events = new List<Event>();

            foreach (var @event in eventStore)
            {
                if (@event.Type == type)
                {
                    events.Add(@event);
                }
            }

            return events;
        }
    }
}
