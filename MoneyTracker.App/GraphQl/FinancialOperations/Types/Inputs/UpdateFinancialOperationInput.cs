using MoneyTracker.App.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class UpdateFinancialOperationInput
    {
        [GuidValidationAttribute(ErrorMessage = "OperationId is invalid")]
        public string OperationId { get; set; }

        public string? Title { get; set; }

        public string? Note { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }

        [GuidValidationAttribute(ErrorMessage = "CategoryId is invalid")]
        public string CategoryId { get; set; }

        [GuidValidationAttribute(ErrorMessage = "AccountId is invalid")]
        public string FromAccountId { get; set; }
        
        [GuidValidationAttribute(ErrorMessage = "AccountId is invalid")]
        public string ToAccountId { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
