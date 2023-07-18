using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.FinancialOperation.Types;
using MoneyTracker.Business.Interfaces;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.FinancialOperation
{
    public class FinancialOperationQuery : ObjectGraphType
    {
        public FinancialOperationQuery(ITransactionRepository transactionRepository)
        {
            Field<ListGraphType<TransactionType>>("GetFinancialOperations")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    return transactionRepository.GetUserTransactions(userId, dateTimeTo);
                }).Authorize();
        }
    }
}
