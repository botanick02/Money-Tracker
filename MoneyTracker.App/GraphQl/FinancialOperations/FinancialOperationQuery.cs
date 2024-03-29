﻿using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperation.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types;
using MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services;
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

                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var travelDateTime = timeTravelParser.ParseTravelDateTime(context);

                    var transactionService = serviceProvider.GetRequiredService<TransactionService>();

                    return transactionService.GetTransactionsData(userId, input?.FromDate, input?.ToDate, input?.AccountId, input?.CategoryId, input?.TransactionType, travelDateTime);
                }).Authorize();
        }
    }
}
