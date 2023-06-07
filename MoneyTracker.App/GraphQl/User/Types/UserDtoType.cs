using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.User.Types
{
    public class UserType : ObjectGraphType<Business.Entities.User>
    {
        public UserType()
        {
            Field(u => u.Id);

            Field(u => u.Name);

            Field(u => u.Email);
        }
    }
}
