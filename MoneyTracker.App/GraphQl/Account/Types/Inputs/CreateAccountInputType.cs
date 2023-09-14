using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class CreateAccountInputType : InputObjectGraphType<CreateAccountInput>
    {
        public CreateAccountInputType()
        {
            Field(a => a.currencyCode);
            Field(a => a.accountName);

        }
    }
}
