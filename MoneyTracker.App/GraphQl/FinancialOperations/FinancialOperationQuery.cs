using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.Primitives;
using MoneyTracker.App.GraphQl.FinancialOperations.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Services;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.FinancialOperation
{
    public class FinancialOperationQuery : ObjectGraphType
    {
        public FinancialOperationQuery(IServiceProvider serviceProvider, HeaderTimeTravelProviderParser timeTravelParser)
        {
            Field<GetTransactionsDtoType>("GetAccountsTransactions")
                .Argument<GetTransactionsForAccountsInputType>("Input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<GetTransactionsForAccountsInput>("Input");

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

                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var travelDateTime = timeTravelParser.ParseTravelDateTime(context);

                    var transactionService = serviceProvider.GetRequiredService<TransactionService>();

                    TransactionTypes? transType = null;

                    if (input?.TransactionType != null)
                    {
                        var stringValue = input?.TransactionType;
                        stringValue = stringValue.ToLowerInvariant();
                        stringValue = char.ToUpperInvariant(stringValue[0]) + stringValue.Substring(1);
                        transType = Enum.Parse<TransactionTypes>(stringValue);
                    }

                    return transactionService.GetTransactionsData(
                        userId: userId,
                        fromDate: input?.FromDate,
                        toDate: input?.ToDate,
                        accountId: input?.AccountId != null ? Guid.Parse(input.AccountId!) : null,
                        categoryId: input?.CategoryId,
                        transactionType: transType,
                        timeTravelDateTime: travelDateTime
                        );
                }).Authorize();
        }
    }
}
