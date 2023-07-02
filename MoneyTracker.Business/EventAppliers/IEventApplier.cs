using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.EventAppliers
{
    public interface IEventApplier<T>
    {
        ReadModel Apply(ReadModel currentModel, T @event);
    }
}
