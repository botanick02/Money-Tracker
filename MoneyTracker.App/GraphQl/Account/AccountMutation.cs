﻿using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Account.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Account;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountMutation : ObjectGraphType
    {
        public AccountMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("CreateAccount")
                .Argument<StringGraphType>("AccountName")
                .Resolve(context =>
                {
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var name = context.GetArgument<string>("AccountName");

                    var command = new CreatePersonalAccountCommand
                    (
                        Name: name,
                        UserId: userId
                    );

                    commandDispatcher.Dispatch(command);

                    return true;
                }).Authorize();
        }
    }
}