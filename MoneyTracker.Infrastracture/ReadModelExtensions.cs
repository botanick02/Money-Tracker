using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.EventAppliers;
using MoneyTracker.Business.EventAppliers.Category;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Infrastracture
{
    public class ReadModelExtensions
    {
        private readonly IEventStore eventStore;
        private readonly IServiceProvider serviceProvider;

        public ReadModelExtensions(IEventStore eventStore, IServiceProvider serviceProvider)
        {
            this.eventStore = eventStore;
            this.serviceProvider = serviceProvider;
        }

        public ReadModel GetReadModel()
        {
            return eventStore.AggregateModel(new ReadModel(), Evolve);
        }

        public ReadModel Evolve(ReadModel currentModel, object @event)
        {
            var eventType = @event.GetType();
            var eventApplierType = typeof(IEventApplier<>).MakeGenericType(eventType);

            var eventApplier = serviceProvider.GetService(eventApplierType);
            if (eventApplier != null)
            {
                var applyMethod = eventApplierType.GetMethod("Apply");
                var applyResult = applyMethod.Invoke(eventApplier, new object[] { currentModel, @event });
                if (applyResult is ReadModel result)
                {
                    return result;
                }
            }

            return currentModel;
        }
    }
}
