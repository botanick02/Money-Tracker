using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class GoogleLoginInputType : InputObjectGraphType<GoogleLoginInput>
    {
        public GoogleLoginInputType()
        {
            Field(g => g.Token, nullable: false);
        }
    }
}
