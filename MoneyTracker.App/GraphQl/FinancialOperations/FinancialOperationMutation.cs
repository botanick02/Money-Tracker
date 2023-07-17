using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.FinancialOperation;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.FinancialOperation
{
    public class FinancialOperationMutation : ObjectGraphType
    {
        public FinancialOperationMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("AddDebitOperation")
                .Argument<DebitOperationInputType>("DebitOperation")
                .Resolve(context =>
                {
                    var transaction = context.GetArgument<DebitOperationInput>("DebitOperation");

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

                    var command = new AddDebitOperationCommand
                    (
                        UserId: Guid.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value), 
                        Title: transaction.Title!, Note: transaction.Note, Amount: transaction.Amount!, 
                        CategoryId: Guid.Parse(transaction.CategoryId), 
                        ToAccountId: Guid.Parse(transaction.ToAccountId)
                     );

                    commandDispatcher.Dispatch(command);

                    return true;
                }).Authorize();

            Field<bool>("AddCreditOperation")
                .Argument<CreditOperationInputType>("CreditOperation")
                .Resolve(context =>
                {
                    var transaction = context.GetArgument<CreditOperationInput>("CreditOperation");

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

                    var command = new AddCreditOperationCommand
                    (
                        UserId: Guid.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value),
                        Title: transaction.Title!, Note: transaction.Note, Amount: transaction.Amount!,
                        CategoryId: Guid.Parse(transaction.CategoryId),
                        FromAccountId: Guid.Parse(transaction.FromAccountId)
                     );

                    commandDispatcher.Dispatch(command);

                    return true;
                }).Authorize();

            Field<bool>("AddTransferOperation")
                .Argument<CreditOperationInputType>("TransferOperation")
                .Resolve(context =>
                {
                    var transaction = context.GetArgument<TransferOperationInput>("TransferOperation");

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

                    var command = new AddTransferOperationCommand
                    (
                        UserId: Guid.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value),
                        Title: transaction.Title!, Note: transaction.Note, Amount: transaction.Amount!,
                        CategoryId: Guid.Parse(transaction.CategoryId),
                        FromAccountId: Guid.Parse(transaction.FromAccountId),
                        ToAccountId: Guid.Parse(transaction.ToAccountId)
                     );

                    commandDispatcher.Dispatch(command);

                    return true;
                }).Authorize();

            Field<bool>("CancelFinancialOperation")
                .Argument<CancelFinancialOperationInputType>("CancelFinOperationInput")
                .Resolve(context =>
                {
                    var input = context.GetArgument<CancelFinancialOperationInput>("CancelFinOperationInput");

                    bool isValid = ModelValidationHelper.ValidateModel(input, out List<ValidationResult> results);

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

                    var command = new CancelFinancialOperationCommand
                    (
                        TransactionId: Guid.Parse(input.OperationId)
                    );

                    commandDispatcher.Dispatch(command);

                    return true;
                });
        }
    }
}
