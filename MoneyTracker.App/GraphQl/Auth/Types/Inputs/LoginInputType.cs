using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class LoginInputType : InputObjectGraphType<LoginInput>
    {
        public LoginInputType() 
        { 
            Field(l => l.Email, nullable: false);

            Field(l => l.Password, nullable: false);
        }
    }
}
