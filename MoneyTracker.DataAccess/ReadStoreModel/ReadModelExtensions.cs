using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.DataAccess
{
    public class ReadModelExtensions : IReadModelExtensions
    {
        private readonly IEventStore eventStore;
        private readonly EventDispatcher eventAppliersDispatcher;
        private readonly CurrentReadModel currentReadModel;
        private ReadModel? tempReadModel;

        public ReadModelExtensions(IEventStore eventStore, EventDispatcher eventAppliersDispatcher, CurrentReadModel currentReadModel)
        {
            this.eventStore = eventStore;
            this.eventAppliersDispatcher = eventAppliersDispatcher;
            this.currentReadModel = currentReadModel;
            tempReadModel = null;
        }

        public ReadModel GetReadModel(DateTime? dateTimeTo = null)
        {
            if (dateTimeTo != null)
            {
                if (tempReadModel == null)
                {
                    tempReadModel = eventStore.AggregateModel(dateTimeTo.Value, new ReadModel(), Evolve);
                }
                return tempReadModel;
            }

            return currentReadModel.CurrentModel;
        }

        public ReadModel Evolve(ReadModel currentModel, BaseEvent @event)
        {
            return eventAppliersDispatcher.ApplyAsync(currentModel, @event).Result;
        }
    }
}
