using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent(Event @event);

        public T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, Event, T> evolve);
    }
}
