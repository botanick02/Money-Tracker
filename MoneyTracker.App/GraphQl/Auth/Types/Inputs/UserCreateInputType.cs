using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class UserCreateInputType : InputObjectGraphType<UserCreateInput>
    {
        public UserCreateInputType()
        {
            Field(r => r.Name, nullable: false);

            Field(r => r.Email, nullable: false);

            Field(r => r.Password, nullable: false);
        }
    }
}
