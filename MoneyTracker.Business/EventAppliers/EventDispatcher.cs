using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.EventAppliers
{
    public class EventDispatcher
    {
        private readonly IServiceProvider serviceProvider;

        public EventDispatcher(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public ReadModel Apply(ReadModel currentModel, object @event)
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
