using GraphQL;
using GraphQL.Types;
using MoneyTracker.API.GraphQl.Auth.Types;
using MoneyTracker.API.GraphQl.Auth.Types.Inputs;
using MoneyTracker.BLL.Services.IServices;

namespace MoneyTracker.API.GraphQl.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(IAuthService authService)
        {
            Field<LoginResponseDtoType>("Login")
                .Argument<LoginInputType>("LoginCredentials")
                .Resolve(context =>
                {
                    var loginCredentials = context.GetArgument<LoginInput>("LoginCredentials");
                    return authService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password);
                });
        }
    }
}
