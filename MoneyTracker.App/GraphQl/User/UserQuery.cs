using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.User.Types;
using MoneyTracker.Business.Interfaces;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository) {

            Field<UserType>("GetUserData")
                .Resolve(context =>
                {

                    var userId = context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                    if (!Guid.TryParse(userId, out var userGuidId))
                    {
                        var exception = new ExecutionError($"Invalid user id");
                        exception.Code = "VALIDATION_ERROR";
                        context.Errors.Add(exception);
                        return false;
                    }

                    var user = userRepository.GetUserById(userGuidId);

                    return user;
                }).Authorize();
        }
    }
}
