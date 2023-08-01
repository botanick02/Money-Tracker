using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class GetStatisticsForAccountsInputType : InputObjectGraphType<GetStatisticsForAccountsInput>
    {
        public GetStatisticsForAccountsInputType()
        {
            Field(g => g.AccountId, nullable: true);

            Field(g => g.FromDate, nullable: true);

            Field(g => g.ToDate, nullable: true);
        }
    }
}
