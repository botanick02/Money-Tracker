using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Transaction.Types.Inputs
{
    public class CancelTransactionInputType : InputObjectGraphType<CancelTransactionInput>
    {
        public CancelTransactionInputType()
        {
            Field(c => c.TransactionId);   
        }
    }
}
