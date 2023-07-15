using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events
{
    public class EventDispatcher
    {
        private readonly IServiceProvider serviceProvider;

        public EventDispatcher(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public ReadModel Apply(ReadModel currentModel, Event @event)
        {
            var eventType = @event.GetType();

            var applierType = typeof(IEventApplier<>).MakeGenericType(eventType);
            var applier = serviceProvider.GetRequiredService(applierType);

            var applyMethod = applier.GetType().GetMethod("Apply");
            var applyResult = applyMethod!.Invoke(applier, new object[] { currentModel, @event });

            if (applyResult is ReadModel result)
            {
                return result;
            }

            return currentModel;
        }

    }
}
