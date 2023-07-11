using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Transaction.Types;
using MoneyTracker.Business.Interfaces;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Transaction
{
    public class TransactionQuery : ObjectGraphType
    {
        public TransactionQuery(ITransactionRepository transactionRepository)
        {
            Field<ListGraphType<TransactionType>>("GetTransactions")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    return transactionRepository.GetTransactions(userId, dateTimeTo);
                }).Authorize();
        }
    }
}
