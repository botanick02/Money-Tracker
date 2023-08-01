using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types
{
    public class GetTransactionsDtoType : ObjectGraphType<GetTransactionsDataDto>
    {
        public GetTransactionsDtoType()
        {
            Field(g => g.Transactions);

            Field(g => g.Expenses);
            
            Field(g => g.Incomes);
        }
    }
}
