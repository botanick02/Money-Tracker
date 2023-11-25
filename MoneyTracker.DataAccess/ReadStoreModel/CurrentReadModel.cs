using MoneyTracker.Business.Events;

namespace MoneyTracker.Business.ReadStoreModel
{
    public class CurrentReadModel
    {
        private readonly EventDispatcher eventDispatcher;
        public ReadModel CurrentModel { get; set; }

        public CurrentReadModel(EventDispatcher eventDispatcher)
        {
            CurrentModel = new ReadModel();
            this.eventDispatcher = eventDispatcher;
        }

        public async Task UpdateAsync(List<BaseEvent> events)
        {
            CurrentModel = await eventDispatcher.ApplyAsync(CurrentModel, events);
        }
    }
}