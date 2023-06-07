using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth.Types;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.Business.Services;

namespace MoneyTracker.App.GraphQl.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(AuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            Field<LoginResponseType>("Login")
                .Argument<LoginInputType>("LoginCredentials")
                .Resolve(context =>
                {
                    var loginCredentials = context.GetArgument<LoginInput>("LoginCredentials");
                    return authService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password, httpContextAccessor.HttpContext!);
                });

            Field<bool>("LogOut")
               .Resolve(context =>
               {
                   return authService.LogUserOut(httpContextAccessor.HttpContext!);
               });

            Field<LoginResponseType>("RefreshToken")
                .Resolve(context =>
                {
                    return authService.RefreshAccessToken(httpContextAccessor.HttpContext!);
                });

            Field<LoginResponseType>("CreateUser")
                .Argument<UserCreateInputType>("CreateUser")
                .Resolve(context =>
                {
                    var newUser = context.GetArgument<UserCreateInput>("CreateUser");
                    return authService.RegisterUser(newUser, httpContextAccessor.HttpContext!);
                });
        }
    }
}
