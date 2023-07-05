using MoneyTracker.Business.EventAppliers;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Infrastracture;

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

        public void Update(object @event)
        {
            CurrentModel = eventDispatcher.Apply(CurrentModel, @event);
        }
    }
}
