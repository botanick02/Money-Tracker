using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class GetTransactionsForAccountsInputType : InputObjectGraphType<GetTransactionsForAccountsInput>
    {
        public GetTransactionsForAccountsInputType()
        {
            Field(g => g.AccountId, nullable: true);

            Field(g => g.FromDate, nullable: true);

            Field(g => g.ToDate, nullable: true);
        }
    }
}
