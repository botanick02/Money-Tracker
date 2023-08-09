using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        Task AppendEventsAsync(List<Event> events);

        Task AppendEventAsync(Event @event);

        T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, Event, T> evolve);
    }
}
