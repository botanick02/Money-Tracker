using GraphQL.Types;
using MoneyTracker.App.Helpers;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class GetTransactionsForAccountsInput
    {
        [GuidValidationAttribute(ErrorMessage = "AccountId is invalid")]
        public string? AccountId { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public Guid? CategoryId { get; set; }

        [CategoryTypeValidation(ErrorMessage = "Transaction type is invalid")]
        public string? TransactionType { get; set; }
    }
    public class GetTransactionsForAccountsInputType : InputObjectGraphType<GetTransactionsForAccountsInput>
    {
        public GetTransactionsForAccountsInputType()
        {
            Field(g => g.AccountId, nullable: true);

            Field(g => g.FromDate, nullable: true);

            Field(g => g.ToDate, nullable: true);

            Field(g => g.CategoryId, nullable: true);

            Field(g => g.TransactionType, nullable: true);
        }
    }
}
