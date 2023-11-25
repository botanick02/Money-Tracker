using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        Task AppendEventsAsync(List<BaseEvent> events);

        Task AppendEventAsync(BaseEvent @event);

        T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, BaseEvent, T> evolve);
    }
}
