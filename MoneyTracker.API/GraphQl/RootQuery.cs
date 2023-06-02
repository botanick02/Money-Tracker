using GraphQL;
using GraphQL.Types;

namespace MoneyTracker.API.GraphQl
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<StringGraphType>("Hello").Resolve(ctx => 
            { 

                return "hello";  
            }).Authorize();
        }
    }
}
