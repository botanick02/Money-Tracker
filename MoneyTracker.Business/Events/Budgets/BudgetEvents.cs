﻿using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Events.Budgets
{
    public record BudgetCreateEvent(Budget Budget) : BaseEvent;
    public record BudgetDeleteEvent(string id) : BaseEvent;
    public record BudgetEditEvent(Budget Budget) : BaseEvent;
}
