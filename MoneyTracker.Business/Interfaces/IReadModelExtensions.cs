using MoneyTracker.Business.Events;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Interfaces
{
    public interface IReadModelExtensions
    {
        ReadModel GetReadModel(DateTime? dateTimeTo = null);
        ReadModel Evolve(ReadModel currentModel, BaseEvent @event);
    }
}
