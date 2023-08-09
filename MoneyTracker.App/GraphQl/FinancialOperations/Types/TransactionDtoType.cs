using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types
{
    public class TransactionDtoType : ObjectGraphType<TransactionDto>
    {
        public TransactionDtoType()
        {
            Field(t => t.Id);

            Field(t => t.OperationId);

            Field(t => t.UserId);

            Field(t => t.Title, nullable: true);
            
            Field(t => t.Note, nullable: true);
            
            Field(t => t.Amount);
            
            Field(t => t.Category);
            
            Field(t => t.CreatedAt);
            
            Field(t => t.AccountId);
        }
    }
}
