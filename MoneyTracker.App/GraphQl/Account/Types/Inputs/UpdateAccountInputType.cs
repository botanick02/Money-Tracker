using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class UpdateAccountInputType : InputObjectGraphType<UpdateAccountInput>
    {
        public UpdateAccountInputType()
        {
            Field(u => u.AccountId);
            Field(u => u.Name);
   
        }
    }
}
