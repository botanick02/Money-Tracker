using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth;
using MoneyTracker.App.GraphQl.Category;
using MoneyTracker.App.GraphQl.User;

namespace MoneyTracker.App.GraphQl
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("User")
                     .Resolve(_ => new { });
            
            Field<CategoryQuery>("Category")
                     .Resolve(_ => new { });
        }
    }
}
