using GraphQL.Types;
using MoneyTracker.BLL.DTO_s;

namespace MoneyTracker.API.GraphQl.Auth.Types
{
    public class LoginResponseDtoType : ObjectGraphType<LoginResponseDto>
    {
        public LoginResponseDtoType() {
            Field(r => r.AccessToken, nullable: true);
        }
    }
}
