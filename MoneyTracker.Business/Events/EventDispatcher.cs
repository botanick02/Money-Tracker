using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.EventHandlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Events
{
    public class EventDispatcher
    {
        private readonly IServiceProvider serviceProvider;

        public EventDispatcher(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public void Dispatch<TEvent>(TEvent @event) where TEvent : IEvent
        {
            var eventHandlers = serviceProvider.GetServices<IEventHandler<TEvent>>();
            foreach (var handler in eventHandlers)
            {
                handler.Handle(@event);
            }
        }
    }
}
