using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.User.Types;
using MoneyTracker.Business.IRepositories;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository) {

            Field<UserType>("GetUserData")
                .Resolve(context =>
                {

                    var userId = int.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var user = userRepository.GetUserById(userId);

                    return user;
                }).Authorize();
        }
    }
}
