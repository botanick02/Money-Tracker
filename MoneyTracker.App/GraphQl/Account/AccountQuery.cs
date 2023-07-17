using GraphQL.Types;
using MoneyTracker.App.GraphQl.Account.Types;
using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountQuery : ObjectGraphType
    {
        public AccountQuery(AccountService accountService)
        {
            Field<ListGraphType<AccountDtoType>>("GetUserAccounts")
                .Resolve(context =>
                {
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    return accountService.GetUserPersonalAccounts(userId);
                });
        }
    }
}
