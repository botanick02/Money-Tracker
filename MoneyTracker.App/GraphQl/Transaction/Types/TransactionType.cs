using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Transaction.Types
{
    public class TransactionType : ObjectGraphType<Business.Entities.Transaction>
    {
        public TransactionType()
        {
            Field(t => t.UserId);

            Field(t => t.Title);
            
            Field(t => t.Note, nullable: true);
            
            Field(t => t.Amount);
            
            Field(t => t.CategoryId);
            
            Field(t => t.CreatedAt);
            
            Field(t => t.AccountId);
        }
    }
}
