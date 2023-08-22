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
        public AccountQuery(AccountService accountService, HeaderTimeTravelProviderParser timeTravel, HttpContent context)
        {
            Field<GetAccountsDtoType>("GetUserAccounts")
                .Resolve(context =>
                {
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var travelDateTime = timeTravel.ParseTravelDateTime(context);

                    return accountService.GetUserPersonalAccounts(userId);
                }).Authorize();
        }
    }
}
