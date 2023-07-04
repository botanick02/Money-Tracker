namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStore
    {
        public void AppendEvent<TEvent>(TEvent @event);

        public T AggregateModel<T>(DateTime dateTimeTo, T @default, Func<T, object, T> evolve);
    }
}
