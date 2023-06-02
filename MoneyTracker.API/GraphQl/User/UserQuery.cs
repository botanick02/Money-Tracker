using GraphQL;
using GraphQL.Types;
using MoneyTracker.API.GraphQl.User.Types;
using MoneyTracker.BLL.Services.IServices;
using System.Security.Claims;

namespace MoneyTracker.API.GraphQl.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserService userService) {

            Field<UserDtoType>("GetUserData")
                .Resolve(context =>
                {
                    var userId = int.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var user = userService.GetUserById(userId);

                    return user;
                }).Authorize();
        }
    }
}
