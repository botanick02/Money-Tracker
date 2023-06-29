using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent<TEvent>(Guid streamId, TEvent @event);

        public List<object> GetEvents(Guid aggregateId, int? version = null);

        public T AggregateStream<T>(Guid streamId, T @default, Func<T, object, T> evolve, int? version = null);
    }
}
