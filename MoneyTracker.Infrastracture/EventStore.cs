using MoneyTracker.Business;
using MoneyTracker.Business.EventAppliers;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Infrastracture;
using Newtonsoft.Json;
using System;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private List<StoredEvent> eventStore = new List<StoredEvent>();
        private readonly CurrentReadModel currentReadModel;

        public EventStore(CurrentReadModel currentReadModel)
        {
            this.currentReadModel = currentReadModel;
        }

        public T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, object, T> evolve)
        {
            var events = GetEvents(dateTimeTo);

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

            eventStore.Add(new StoredEvent
            {
                Id = Guid.NewGuid(),
                Data = JsonConvert.SerializeObject(@event),
                Type = @event.GetType().AssemblyQualifiedName,
                Version = events.Any() ? events.First().Version + 1 : 1,
                CreatedAt = DateTime.Now,
            });

            currentReadModel.Update(@event);
        }

        public List<object> GetEvents(DateTime dateTimeTo)
        {
            var events = eventStore.Where(e => e.CreatedAt <= dateTimeTo);
            return events.Select(e => JsonConvert.DeserializeObject(e.Data, Type.GetType(e.Type))).ToList();
        }
    }
}
