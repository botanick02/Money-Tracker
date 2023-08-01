using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs;
using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.S
{
    public class StatisticsQuery : ObjectGraphType
    {
        public StatisticsQuery(StatisticService statisticService)
        {
            Field<ListGraphType<GetStatisticsDtoType>>("GetStatistics")
                .Argument<GetStatisticsForAccountsInputType>("Input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

              
                    return statisticService.GetStatistics(userId);
                }).Authorize();
        }
    }
}
