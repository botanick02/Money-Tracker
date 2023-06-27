using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth;
using MoneyTracker.App.GraphQl.Transaction;

namespace MoneyTracker.App.GraphQl
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<AuthMutation>("Auth")
                    .Resolve(_ => new { });

            Field<TransactionMutation>("Transaction")
                    .Resolve(_ => new { });
        }
    }
}
