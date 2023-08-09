using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs;
using MoneyTracker.Business.Services;
using MoneyTracker.Business.Services.Dto_s;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.S
{


    public class StatisticsQuery : ObjectGraphType
    {
        public StatisticsQuery(StatisticService statisticService)
        {
            Field<ListGraphType<GetStatisticsDtoType>>("positiveTransactions",
                arguments: new QueryArguments(new QueryArgument<GetStatisticsForAccountsInputType> { Name = "Input" }),
                resolve: context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var statistics = statisticService.GetStatistics(userId, accountId: input.AccountId);

                    return statistics.positiveTransactions;
                }).Authorize();

            Field<ListGraphType<GetStatisticsDtoType>>("negativeTransactions",
                arguments: new QueryArguments(new QueryArgument<GetStatisticsForAccountsInputType> { Name = "Input" }),
                resolve: context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var statistics = statisticService.GetStatistics(userId, accountId: input.AccountId);

                    return statistics.negativeTransactions;
                }).Authorize();
        }
    }
}
