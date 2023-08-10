using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs
{
    public class CreditOperationInputType : InputObjectGraphType<CreditOperationInput>
    {
        public CreditOperationInputType()
        {
            Field(t => t.CategoryId);

            Field(t => t.Title, nullable: true);

            Field(t => t.Note, nullable: true);

            Field(t => t.FromAccountId);

            Field(t => t.Amount);

            Field(t => t.CreatedAt, nullable: true);
        }
    }
}
