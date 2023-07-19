using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Budget.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.DataAccess;

namespace MoneyTracker.App.GraphQl.Budget
{
    public class BudgetQuery : ObjectGraphType
    {
        public BudgetQuery(IBudgetRepository repository) {
            Field<ListGraphType<BudgetType>>("GetBudgets")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");
                    return repository.GetBudgets(dateTimeTo);
                });
        }
    }
}
