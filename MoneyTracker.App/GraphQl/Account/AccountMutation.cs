using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types.Inputs;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Account;
using MoneyTracker.Business.Interfaces;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountMutation : ObjectGraphType
    {
        private readonly ICurrencyRepository currencyRepository;

        public AccountMutation(CommandDispatcher commandDispatcher, ICurrencyRepository currencyRepository)
        {
            this.currencyRepository = currencyRepository;

            Field<bool>("CreateAccount")

                .Argument<CreateAccountInputType>("AddAccount")

                .ResolveAsync(async context =>
                {
                    var account = context.GetArgument<CreateAccountInput>("AddAccount");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var name = account.accountName;
                    var currencyCode = account.currencyCode;
                    var currency = currencyRepository.GetCurrencyByCode(currencyCode);

                    var command = new CreatePersonalAccountCommand
                    (
                        Name: name,
                        UserId: userId,
                        Currency: currency
                    );
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();

            Field<bool>("EditAccount")
                .Argument<NonNullGraphType<StringGraphType>>("accountId", "The ID of the account to edit")
                .Argument<NonNullGraphType<StringGraphType>>("accountName", "The new name of the account")
                .ResolveAsync(async context =>
                {
                    var accountName = context.GetArgument<string>("accountName");
                    var accountID = context.GetArgument<string>("accountId");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var command = new UpdatePersonalAccountCommand

                    (
                        AccountId: accountID,
                        Name: accountName,
                        UserId: userId
                    )
                    {

                    };
                    await commandDispatcher.DispatchAsync(command);
                    return true;


                }).Authorize();

            Field<bool>("DeleteAccount")
                .Argument<NonNullGraphType<StringGraphType>>("AccountID", "The ID of the account to delete")
                .ResolveAsync(async context =>
                {
                    var accountID = context.GetArgument<string>("AccountID");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    var command = new DeactivatePersonalAccountCommand
                    (
                        AccountId: accountID
                    );

                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();
        }
    }
}
