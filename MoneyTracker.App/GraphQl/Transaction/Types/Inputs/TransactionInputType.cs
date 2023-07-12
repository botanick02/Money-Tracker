using GraphQL.Types;
using static MoneyTracker.Business.Commands.Transaction.TransactionCommands;

namespace MoneyTracker.App.GraphQl.Transaction.Types.Inputs
{
    public class TransactionInputType : InputObjectGraphType<TransactionInput>
    {
        public TransactionInputType()
        {
            Field(t => t.CategoryId);

            Field(t => t.Title);

            Field(t => t.Note, nullable: true);

            Field(t => t.FromAccountId);

            Field(t => t.ToAccountId);

            Field(t => t.Amount);
        }
    }
}
