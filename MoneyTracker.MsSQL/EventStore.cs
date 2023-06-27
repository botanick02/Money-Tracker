using System;
using System.Collections.Generic;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Infrastructure.EventStore
{
    public class EventStore : IEventStore
    {
        private List<IEvent> eventStore = new List<IEvent>();

        public void AppendEvent<TEvent>(TEvent _event) where TEvent : IEvent
        {
            eventStore.Add(_event);
        }

        public IEnumerable<TEvent> GetEventsByAggregateId<TEvent>(Guid aggregateId) where TEvent : class
        {
            var events = new List<TEvent>();

            foreach (var @event in eventStore)
            {
                if (@event is TEvent typedEvent && HasMatchingAggregateId(typedEvent, aggregateId))
                {
                    events.Add(typedEvent);
                }
            }

            return events;
        }

        private static bool HasMatchingAggregateId<TEvent>(TEvent @event, Guid aggregateId) where TEvent : class
        {
            // Implement your logic to check if the event's aggregate ID matches the provided ID.
            // For example, if the event has an AggregateId property:
            // return @event is IEventWithAggregateId eventWithAggregateId &&
            //        eventWithAggregateId.AggregateId == aggregateId;

            // Return true for demonstration purposes
            return true;
        }
    }
}
