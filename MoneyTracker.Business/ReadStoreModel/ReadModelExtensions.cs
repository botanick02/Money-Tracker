﻿using MoneyTracker.Business.EventAppliers;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Infrastracture
{
    public class ReadModelExtensions
    {
        private readonly IEventStore eventStore;
        private readonly EventDispatcher eventAppliersDispatcher;
        private readonly CurrentReadModel currentReadModel;

        public ReadModelExtensions(IEventStore eventStore, EventDispatcher eventAppliersDispatcher, CurrentReadModel currentReadModel)
        {
            this.eventStore = eventStore;
            this.eventAppliersDispatcher = eventAppliersDispatcher;
            this.currentReadModel = currentReadModel;
        }

        public ReadModel GetReadModel(DateTime? dateTimeTo = null)
        {
            if (dateTimeTo != null)
            {
                return eventStore.AggregateModel(dateTimeTo.Value, new ReadModel(), Evolve);
            }

            return currentReadModel.CurrentModel;
        }

        public ReadModel Evolve(ReadModel currentModel, object @event)
        {
            return eventAppliersDispatcher.Apply(currentModel, @event);
        }
    }
}