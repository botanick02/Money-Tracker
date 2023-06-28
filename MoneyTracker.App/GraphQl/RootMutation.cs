using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth;
using MoneyTracker.App.GraphQl.Category;

namespace MoneyTracker.App.GraphQl
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<AuthMutation>("Auth")
                    .Resolve(_ => new { });

            Field<CategoryMutation>("Category")
                    .Resolve(_ => new { });
        }
    }
}
