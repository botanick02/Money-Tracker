using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Auth.Types
{
    public class LoginResponseType : ObjectGraphType<LoginResponse>
    {
        public LoginResponseType() {
            Field(r => r.AccessToken, nullable: true);
        }
    }
}