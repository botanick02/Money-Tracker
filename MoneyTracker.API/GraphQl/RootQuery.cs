using GraphQL;
using GraphQL.Types;
using MoneyTracker.API.GraphQl.Auth;
using MoneyTracker.API.GraphQl.User;

namespace MoneyTracker.API.GraphQl
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("User")
                     .Resolve(_ => new { });
        }
    }
}
