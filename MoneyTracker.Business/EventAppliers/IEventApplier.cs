using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.EventAppliers
{
    public interface IEventApplier<T>
    {
        ReadModel Apply(ReadModel currentModel, T @event);
    }
}
