using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class UpdateFinancialOperationInputType : InputObjectGraphType<UpdateFinancialOperationInput>
    {
        public UpdateFinancialOperationInputType()
        {
            Field(u => u.OperationId);

            Field(u => u.Amount);

            Field(u => u.Title, nullable: true);

            Field(u => u.CategoryId);

            Field(u => u.Note, nullable: true);

            Field(u => u.CreatedAt);

            Field(u => u.FromAccountId, nullable: true);

            Field(u => u.ToAccountId, nullable: true);
        }
    }
}
