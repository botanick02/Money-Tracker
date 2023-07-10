using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Transaction.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Commands;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using static MoneyTracker.Business.Commands.Transaction.TransactionCommands;

namespace MoneyTracker.App.GraphQl.Transaction
{
    public class TransactionMutation : ObjectGraphType
    {
        public TransactionMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("AddTransaction")
                .Argument<TransactionInputType>("Transaction")
                .Resolve(context =>
                {
                    var transaction = context.GetArgument<TransactionInput>("Transaction");

                    bool isValid = ModelValidationHelper.ValidateModel(transaction, out List<ValidationResult> results);

                    if (!isValid)
                    {
                        foreach (var result in results)
                        {
                            var exception = new ExecutionError($"{result.MemberNames.First()}: {result.ErrorMessage!}");
                            exception.Code = "VALIDATION_ERROR";
                            context.Errors.Add(exception);
                        }
                        return false;
                    }

                    var command = new AddTransactionCommand
                    {
                        UserId = Guid.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value),
                        Title = transaction.Title!,
                        Note = transaction.Note,
                        Amount = transaction.Amount!,
                        CategoryId = Guid.Parse(transaction.CategoryId),
                        FromAccountId = Guid.Parse(transaction.FromAccountId),
                        ToAccountId = Guid.Parse(transaction.ToAccountId)
                    };
                    commandDispatcher.Dispatch(command);

                    return true;
                });
        }
    }

    public class GuidValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is string stringValue)
            {
                return Guid.TryParse(stringValue, out _);
            }

            return false;
        }
    }
}
