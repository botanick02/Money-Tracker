using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs
{
    public class FinancialOperationInputType : InputObjectGraphType<FinancialOperationInput>
    {
        public FinancialOperationInputType()
        {
            Field(t => t.CategoryId);

            Field(t => t.Title);

            Field(t => t.Note, nullable: true);

            Field(t => t.FromAccountId);

            Field(t => t.ToAccountId);

            Field(t => t.Amount);
        }
    }
}
