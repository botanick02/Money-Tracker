using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.ReadStoreModel;
using Newtonsoft.Json;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private readonly CurrentReadModel currentReadModel;
        private readonly IEventStoreRepository eventStoreRepository;
        public EventStore(CurrentReadModel currentReadModel, IEventStoreRepository eventStoreRepository)
        {
            this.currentReadModel = currentReadModel;
            this.eventStoreRepository = eventStoreRepository;
        }

        public T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, Event, T> evolve)
        {
            var events = GetEvents(dateTimeTo);

            var aggregate = @default;

            foreach (var @event in events)
            {
                aggregate = evolve(aggregate, @event);
            }

            return aggregate;
        }

        public async Task AppendEventAsync(Event @event)
        {
            await AppendEventsAsync(new List<Event> { @event });
        }
        public async Task AppendEventsAsync(List<Event> events)
        {
            var storedEvents = events.Select(@event => new StoredEvent
            {
                Data = JsonConvert.SerializeObject(@event),
                Type = @event.GetType().AssemblyQualifiedName,
                CreatedAt = DateTime.Now,
            }).ToList();

            await eventStoreRepository.AppendEventsAsync(storedEvents);
            await currentReadModel.UpdateAsync(events);
        }

        public List<Event> GetEvents(DateTime dateTimeTo)
        {
            var events = eventStoreRepository.GetEvents(dateTimeTo)
                .Select(e => JsonConvert.DeserializeObject(e.Data, Type.GetType(e.Type)))
                .Where(obj => obj is Event)
                .Cast<Event>()
                .ToList();

            return events;
        }
    }
}
