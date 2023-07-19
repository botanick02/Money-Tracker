using GraphQL.Types;
using MoneyTracker.App.GraphQl.Account;
using MoneyTracker.App.GraphQl.Auth;
using MoneyTracker.App.GraphQl.Category;
using MoneyTracker.App.GraphQl.FinancialOperation;

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
            
            Field<FinancialOperationMutation>("FinancialOperation")
                    .Resolve(_ => new { });

            Field<AccountMutation>("Account")
                    .Resolve(_ => new { });
        }
    }
}
