using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs;

using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.FinancialOperation
{
    public class StatisticsQuery : ObjectGraphType
    {
        public StatisticsQuery(TransactionService transactionService)
        {
            Field<GetStatisticsDtoType>("GetStatistics")
                .Argument<GetStatisticsForAccountsInputType>("Input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");

                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    return transactionService.GetTransactionsData(userId, input?.FromDate, input?.ToDate, input?.AccountId);
                }).Authorize();
        }
    }
}
