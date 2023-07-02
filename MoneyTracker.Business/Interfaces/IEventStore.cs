namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent<TEvent>(TEvent @event);

        public List<object> GetEvents(DateTime dateTimeTo);

        public T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, object, T> evolve);
    }
}
