using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events
{
    public interface IEventApplier<T>
    {
        Task<ReadModel> ApplyAsync(ReadModel currentModel, T @event);
    }
}
