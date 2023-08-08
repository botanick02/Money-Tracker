using MoneyTracker.Business.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Interfaces
{
    public interface IEventStoreRepository
    {
        List<StoredEvent> GetEvents(DateTime? dateTimeTo = null);

        Task AppendEventsAsync(List<StoredEvent> events);
    }
}
