using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.Account.Types
{
    public class AccountDtoType : ObjectGraphType<AccountDto>
    {
        public AccountDtoType()
        {
            Field(a => a.Id);
            Field(a => a.Name);
            Field(a => a.Currency);
            Field(a => a.Balance);
        }
    }
}
