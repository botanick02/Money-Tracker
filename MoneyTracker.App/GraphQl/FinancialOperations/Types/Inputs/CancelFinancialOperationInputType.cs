using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs
{
    public class CancelFinancialOperationInputType : InputObjectGraphType<CancelFinancialOperationInput>
    {
        public CancelFinancialOperationInputType()
        {
            Field(c => c.OperationId);   
        }
    }
}
