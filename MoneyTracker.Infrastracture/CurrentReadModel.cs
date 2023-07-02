using MoneyTracker.Business;
using MoneyTracker.Business.EventAppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Infrastracture
{
    public class CurrentReadModel
    {
        private readonly EventDispatcher eventDispatcher;
        public ReadModel CurrentModel { get; private set; }

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
