using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Budget.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Budget;

namespace MoneyTracker.App.GraphQl.Budget
{
    public class BudgetMutation : ObjectGraphType
    {
        public BudgetMutation(CommandDispatcher commandDispatcher)
        {

            Field<bool>("editBudget")
                .Argument<BudgetInputType>("Budget")
                .Resolve(context =>
                {
                    var budget = context.GetArgument<Business.Entities.Budget>("Budget");

                    var command = new EditBudgetCommand(budget);

                    try
                    {
                        commandDispatcher.Dispatch(command);
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError(ex.Message);
                        context.Errors.Add(exception);
                        return false;
                    }
                    return true;
                });
        }
    }
}
