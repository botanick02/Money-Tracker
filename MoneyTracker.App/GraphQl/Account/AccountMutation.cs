using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types.Inputs;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Account;
using MoneyTracker.Business.Entities;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountMutation : ObjectGraphType
    {
        public AccountMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("CreateAccount")
                .Argument<StringGraphType>("AccountName")
                .ResolveAsync(async context =>
                {
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var name = context.GetArgument<string>("AccountName");
                    var command = new CreatePersonalAccountCommand
                    (
                        Name: name,
                        UserId: userId
                    );
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();

            Field<bool>("EditAccount")
    .Argument<NonNullGraphType<StringGraphType>>("accountId", "The ID of the account to edit")
    .Argument<NonNullGraphType<StringGraphType>>("accountName", "The new name of the account")
    .ResolveAsync(async context =>
    {
        var accountName = context.GetArgument<string>("accountName");
        var accountID = context.GetArgument<string>("accountID");
        var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var command = new UpdatePersonalAccountCommand
        (
            UserId: userId,
            Name: accountName,
            AccountId: accountID
        );
        await commandDispatcher.DispatchAsync(command);
        return true;
    }).Authorize();



            Field<bool>("DeleteAccount")
     .Argument<NonNullGraphType<StringGraphType>>("AccountID", "The ID of the account to delete")
     .ResolveAsync(async context =>
     {
         var accountID = context.GetArgument<string>("AccountID");
         var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
         var command = new DeactivatePersonalAccountCommand
         (
             UserId: userId,
             AccountId: accountID
         );
         await commandDispatcher.DispatchAsync(command);
         return true;
     }).Authorize();


        }
    }
}
