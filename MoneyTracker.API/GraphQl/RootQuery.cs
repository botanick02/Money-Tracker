using GraphQL.Types;

namespace MoneyTracker.API.GraphQl
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<StringGraphType>("muaasfasf").Resolve(ctx => "hello");
        }
    }
}
