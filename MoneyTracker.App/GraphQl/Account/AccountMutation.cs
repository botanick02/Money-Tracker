using GraphQL;
using GraphQL.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Account;
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
        }
    }
}
