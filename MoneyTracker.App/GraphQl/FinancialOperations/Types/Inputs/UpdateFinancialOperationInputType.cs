using GraphQL.Types;
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

        [GuidValidationAttribute(ErrorMessage = "FromAccountId is invalid")]
        public string? FromAccountId { get; set; }

        [GuidValidationAttribute(ErrorMessage = "ToAccountId is invalid")]
        public string? ToAccountId { get; set; }

        public DateTime CreatedAt { get; set; }
    }

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
