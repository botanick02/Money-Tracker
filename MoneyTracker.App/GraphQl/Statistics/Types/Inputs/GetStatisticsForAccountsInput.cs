using MoneyTracker.App.Helpers;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class GetStatisticsForAccountsInput
    {
        [GuidValidationAttribute(ErrorMessage = "FromAccountId is invalid")]

        public Guid? AccountId { get; set; }
        public Guid? CategoryId { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }
    }
}
