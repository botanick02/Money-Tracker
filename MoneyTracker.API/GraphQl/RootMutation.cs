using GraphQL.Types;
using MoneyTracker.API.GraphQl.Auth;

namespace MoneyTracker.API.GraphQl
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<AuthMutation>("Auth")
                    .Resolve(_ => new { });

        }
    }
}
