using GraphQL.Types;
using MoneyTracker.App.Helpers;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs
{
    public class CancelFinancialOperationInput
    {
        [GuidValidation(ErrorMessage = "Operation id is invalid")]
        public string OperationId { get; set; }
    }
    public class CancelFinancialOperationInputType : InputObjectGraphType<CancelFinancialOperationInput>
    {
        public CancelFinancialOperationInputType()
        {
            Field(c => c.OperationId);   
        }
    }
}
