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
                .ResolveAsync(async context =>
                {

                    var userId = context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                    var user = await userRepository.GetUserByIdAsync(userId);

                    return user;
                }).Authorize();
        }
    }
}
