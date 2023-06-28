using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private List<Event> eventStore = new List<Event>();

        public T AggregateStream<T>(Guid streamId, T @default, Func<T, object, T> evolve)
        {
            var events = GetEventsByAggregateId(streamId);

            var aggregate = @default;

            foreach (var @event in events)
            {
                aggregate = evolve(aggregate, @event);
            }

            return aggregate;
        }

        public void AppendEvent<TEvent>(Guid streamId, TEvent @event)
        {
            var events = eventStore.Where(e => e.StreamId == streamId).OrderByDescending(e => e.Version);

            eventStore.Add(new Event
            {
                Id = Guid.NewGuid(),
                Data = JsonConvert.SerializeObject(@event),
                StreamId = streamId,
                Type = @event.GetType().AssemblyQualifiedName,
                Version = events.Any() ? events.First().Version + 1 : 1,
            });
        }

        public List<object> GetEventsByAggregateId(Guid aggregateId)
        {
            var events = eventStore.Where(e => e.StreamId == aggregateId)
                .Select(e => JsonConvert.DeserializeObject(e.Data, Type.GetType(e.Type))).ToList();

            return events;
        }
    }
}
