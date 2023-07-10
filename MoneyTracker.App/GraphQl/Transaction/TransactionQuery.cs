using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Transaction.Types;
using MoneyTracker.Business.Interfaces;

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
                    return transactionRepository.GetTransactions(dateTimeTo);
                });
        }
    }
}
