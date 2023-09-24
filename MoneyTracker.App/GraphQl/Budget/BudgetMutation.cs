using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Budget.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Budget;
using MoneyTracker.Business.Services.Dto_s;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Budget
{
    public class BudgetMutation : ObjectGraphType
    {
        public BudgetMutation(CommandDispatcher commandDispatcher)
        {

            Field<bool>("createBudget")
                .Argument<BudgetInputType>("Budget")
                .ResolveAsync(async context =>
                {
                    var budgetInput = context.GetArgument<BudgetInputDto>("Budget");
                    var budget = budgetInput.ToBudget();
                    budget.UserId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);


                    var command = new CreateBudgetCommand(budget);

                    try
                    {
                        await commandDispatcher.DispatchAsync(command);
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError(ex.Message);
                        context.Errors.Add(exception);
                        return false;
                    }
                    return true;
                }).Authorize();

            Field<bool>("deleteBudget")
                .Argument<StringGraphType>("id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<string>("id");

                    var command = new DeleteBudgetCommand(id);

                    try
                    {
                        await commandDispatcher.DispatchAsync(command);
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError(ex.Message);
                        context.Errors.Add(exception);
                        return false;
                    }
                    return true;
                }).Authorize();


            Field<bool>("editBudget")
                .Argument<BudgetInputType>("Budget")
                .ResolveAsync(async context =>
                {
                    var budgetInput = context.GetArgument<BudgetInputDto>("Budget");
                    var budget = budgetInput.ToBudget();
                    budget.UserId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);


                    var command = new EditBudgetCommand(budget);

                    try
                    {
                        await commandDispatcher.DispatchAsync(command);
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError(ex.Message);
                        context.Errors.Add(exception);
                        return false;
                    }
                    return true;
                }).Authorize();
        }
    }
}
