using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth;

namespace MoneyTracker.App.GraphQl
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
