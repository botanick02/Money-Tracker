﻿using GraphQL;
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
            Field<ListGraphType<GetStatisticsDtoType>>("PositiveTransactions")
                .Argument<GetStatisticsForAccountsInputType>("Input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var statistics = statisticService.GetStatistics(userId, accountId: input.AccountId, fromDate: input.FromDate, toDate: input.ToDate);

                    return statistics.positiveTransactions;
                }).Authorize();

            Field<ListGraphType<GetStatisticsDtoType>>("NegativeTransactions")
                .Argument<GetStatisticsForAccountsInputType>("Input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<GetStatisticsForAccountsInput>("Input");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var statistics = statisticService.GetStatistics(userId, accountId: input.AccountId, fromDate: input.FromDate, toDate: input.ToDate);

                    return statistics.negativeTransactions;
                }).Authorize();
        }
    }
}
