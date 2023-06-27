using MoneyTracker.Business.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.EventHandlers
{
    public interface IEventHandler<TEvent>
        where TEvent : IEvent
    {
        void Handle(TEvent _event);
    }
}
