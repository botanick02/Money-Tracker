using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events
{
    public interface IEventApplier<T>
    {
        ReadModel Apply(ReadModel currentModel, T @event);
    }
}
