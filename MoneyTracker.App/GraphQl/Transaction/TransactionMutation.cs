using GraphQL.Types;
using MoneyTracker.Business.Commands;

namespace MoneyTracker.App.GraphQl.Transaction
{
    public class TransactionMutation : ObjectGraphType
    {
        public TransactionMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("TestCreateTransaction")
                .Resolve(context =>
                {
                    CreateTransactionCommand command = new CreateTransactionCommand
                    {
                        UserId = Guid.NewGuid(),
                        Title = "Example Transaction",
                        Note = "This is an example transaction",
                        Amount = 100.00m,
                        CategoryId = Guid.NewGuid(),
                        DateTime = DateTime.UtcNow,
                        AccountId = Guid.NewGuid()
                    };

                    commandDispatcher.Dispatch(command);
                    return true;
                });
        }
    }
}
