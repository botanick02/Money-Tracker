namespace MoneyTracker.App.GraphQl.Transaction.Types.Inputs
{
    public class CancelTransactionInput
    {
        [GuidValidation(ErrorMessage = "Transaction id is invalid")]
        public string TransactionId { get; set; }
    }
}
