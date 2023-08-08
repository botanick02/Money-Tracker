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

        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, List<Event> events)
        {
            var updatedModel = currentModel;
            foreach (var @event in events)
            {
                var eventType = @event.GetType();

                var applierType = typeof(IEventApplier<>).MakeGenericType(eventType);
                var applier = serviceProvider.GetRequiredService(applierType);

                var applyMethod = applier.GetType().GetMethod("ApplyAsync");
                var applyTask = (Task<ReadModel>)applyMethod!.Invoke(applier, new object[] { updatedModel, @event })!;

                updatedModel = await applyTask.ConfigureAwait(false);
            }
            return updatedModel;
        }

        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, Event @event)
        {
            return await ApplyAsync(currentModel, new List<Event> { @event });
        }
    }
}
