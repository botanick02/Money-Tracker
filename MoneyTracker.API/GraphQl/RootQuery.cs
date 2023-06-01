using GraphQL.Types;
using MoneyTracker.Api.GraphQl.Auth;

namespace MoneyTracker.Api.GraphQl
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<AuthQuery>("Auth")
                .Resolve(_ => new AuthQuery());
        }
    }
}
