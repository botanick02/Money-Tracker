using GraphQL.Types;
using MoneyTracker.BLL.DTO_s.User;

namespace MoneyTracker.API.GraphQl.Auth.Types.Inputs
{
    public class RegisterUserInputType : InputObjectGraphType<UserCreateDto>
    {
        public RegisterUserInputType()
        {
            Field(r => r.Name, nullable: false);

            Field(r => r.Email, nullable: false);

            Field(r => r.Password, nullable: false);
        }
    }
}
