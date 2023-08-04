using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs
{
    public class DebitOperationInputType : InputObjectGraphType<DebitOperationInput>
    {
        public DebitOperationInputType()
        {
            Field(t => t.CategoryId);

            Field(t => t.Title);

            Field(t => t.Note, nullable: true);

            Field(t => t.ToAccountId);

            Field(t => t.Amount);

            Field(t => t.CreatedAt, nullable: true);
        }
    }
}
