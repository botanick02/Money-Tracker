namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent<TEvent>(TEvent @event);

        public List<object> GetEvents();

        public T AggregateModel<T>(T @default, Func<T, object, T> evolve);
    }
}
