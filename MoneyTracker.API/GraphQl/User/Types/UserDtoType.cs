using GraphQL.Types;
using MoneyTracker.BLL.DTO_s.User;

namespace MoneyTracker.API.GraphQl.User.Types
{
    public class UserDtoType : ObjectGraphType<UserDto>
    {
        public UserDtoType()
        {
            Field(u => u.Id);

            Field(u => u.Name);

            Field(u => u.Email);
        }
    }
}
