using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Commands.Budget
{
    public record CreateBudgetCommand(Entities.Budget Budget);
    public record DeleteBudgetCommand(string id);

    public record EditBudgetCommand(Entities.Budget Budget);

    public record DeactivateBudgetCommand(Guid Id);
}
