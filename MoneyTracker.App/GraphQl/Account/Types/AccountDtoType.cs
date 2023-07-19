using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.Account.Types
{
    public class GetAccountsDtoType : ObjectGraphType<GetAccountsDto>
    {
        public GetAccountsDtoType()
        {
            Field(a => a.Accounts);
            Field(a => a.Total);
        }
    }
}
