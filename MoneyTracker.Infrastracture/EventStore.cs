using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using Newtonsoft.Json;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private List<Event> eventStore = new List<Event>();

        public T AggregateModel<T>(T @default, Func<T, object, T> evolve)
        {
            var events = GetEvents();

            var aggregate = @default;

            foreach (var @event in events)
            {
                aggregate = evolve(aggregate, @event);
            }

            return aggregate;
        }

        public void AppendEvent<TEvent>(TEvent @event)
        {
            var events = eventStore;

            eventStore.Add(new Event
            {
                Id = Guid.NewGuid(),
                Data = JsonConvert.SerializeObject(@event),
                Type = @event.GetType().AssemblyQualifiedName,
                Version = events.Any() ? events.First().Version + 1 : 1,
            });
        }

        public List<object> GetEvents()
        {
            return eventStore.Select(e => JsonConvert.DeserializeObject(e.Data, Type.GetType(e.Type))).ToList();
        }
    }
}
