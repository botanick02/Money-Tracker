using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth.Types;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Services;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

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

                    try
                    {
                        return authService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password, httpContextAccessor.HttpContext!);
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError(ex.Message);
                        exception.Code = "UNAUTHORIZED";
                        context.Errors.Add(exception);
                        return null;
                    }
                });

            Field<bool>("LogOut")
               .Resolve(context =>
               {
                   return authService.LogUserOut(httpContextAccessor.HttpContext!);
               }).Authorize();

            Field<LoginResponseType>("RefreshToken")
                .Resolve(context =>
                {
                    try
                    {
                        return authService.RefreshAccessToken(httpContextAccessor.HttpContext!);
                    }
                    catch (InvalidRefreshTokenException)
                    {
                        var exception = new ExecutionError($"Refresh token validation error");
                        exception.Code = "INVALID_TOKEN";
                        context.Errors.Add(exception);
                        return null;
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError($"Internal Server Error");
                        exception.Code = "SERVER_ERROR";
                        context.Errors.Add(exception);
                        Debug.Write(ex);
                        return null;
                    }
                });

            Field<LoginResponseType>("CreateUser")
                .Argument<UserCreateInputType>("CreateUser")
                .Resolve(context =>
                {
                    var newUser = context.GetArgument<UserCreateInput>("CreateUser");

                    bool isValid = ModelValidationHelper.ValidateModel(newUser, out List<ValidationResult> results);

                    if (!isValid)
                    {
                        foreach (var result in results)
                        {
                            
                            var exception = new ExecutionError($"{result.MemberNames.First()}: {result.ErrorMessage!}");
                            exception.Code = "VALIDATION_ERROR";
                            context.Errors.Add(exception);
                        }
                        return null;
                    }
                    try
                    {
                        return authService.RegisterUser(newUser, httpContextAccessor.HttpContext!);
                    }
                    catch (UserAlreadyExistsException)
                    {
                        var exception = new ExecutionError($"Email: User with the same email already exists");
                        exception.Code = "CONFLICT";
                        context.Errors.Add(exception);
                        return null;
                    }
                    catch (Exception ex)
                    {
                        var exception = new ExecutionError($"Internal Server Error");
                        exception.Code = "SERVER_ERROR";
                        context.Errors.Add(exception);
                        Debug.Write(ex);
                        return null;
                    }
                });
        }
    }
}
