using GraphQL;
using GraphQL.Types;
using MoneyTracker.API.GraphQl.Auth.Types;
using MoneyTracker.API.GraphQl.Auth.Types.Inputs;
using MoneyTracker.BLL.DTO_s.User;
using MoneyTracker.BLL.Services.IServices;

namespace MoneyTracker.API.GraphQl.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(IAuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            Field<LoginResponseDtoType>("Login")
                .Argument<LoginInputType>("LoginCredentials")
                .Resolve(context =>
                {
                    var loginCredentials = context.GetArgument<LoginInput>("LoginCredentials");
                    return authService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password, httpContextAccessor.HttpContext!);
                });

            Field<LoginResponseDtoType>("RefreshToken")
                .Resolve(context =>
                {
                    return authService.RefreshAccessToken(httpContextAccessor.HttpContext!);
                });

            Field<LoginResponseDtoType>("RegisterUser")
                .Argument<RegisterUserInputType>("RegisterUser")
                .Resolve(context =>
                {
                    var newUser = context.GetArgument<UserCreateDto>("RegisterUser");
                    return authService.RegisterUser(newUser, httpContextAccessor.HttpContext!);
                });
        }
    }
}
