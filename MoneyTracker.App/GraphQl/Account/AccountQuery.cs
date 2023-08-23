using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Account.Types;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountQuery : ObjectGraphType
    {
        public AccountQuery(AccountService accountService, HeaderTimeTravelProviderParser timeTravelParser)
        {
            Field<GetAccountsDtoType>("GetUserAccounts")
                .Resolve(context =>
                {
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var travelDateTime = timeTravelParser.ParseTravelDateTime(context);

                    return accountService.GetUserPersonalAccounts(userId, travelDateTime);
                }).Authorize();
        }
    }
}
