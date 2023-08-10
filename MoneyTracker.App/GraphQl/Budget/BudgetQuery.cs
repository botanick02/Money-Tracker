using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Budget.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services;
using MoneyTracker.DataAccess;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Budget
{
    public class BudgetQuery : ObjectGraphType
    {
        public BudgetQuery(BudgetService service) {
            Field<ListGraphType<BudgetType>>("GetBudgets")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var res = service.GetBudgets(userId);
                    return res;
                })
                .Authorize();
        }
    }
}
