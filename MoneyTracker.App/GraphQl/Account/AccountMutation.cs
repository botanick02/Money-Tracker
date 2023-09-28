using GraphQL;
using GraphQL.DataLoader;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types.Inputs;
using MoneyTracker.App.GraphQl.FinancialOperation.Types.Inputs;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Account;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Commands.FinancialOperation;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.DataAccess.Repositories;
using System.Security.Claims;
using System.Security.Principal;
using System.Transactions;

namespace MoneyTracker.App.GraphQl.Account
{
    public class AccountMutation : ObjectGraphType
    {
        private readonly ICurrencyRepository currencyRepository;

        public AccountMutation(CommandDispatcher commandDispatcher, ICurrencyRepository currencyRepository, ICategoryRepository categoryRepository, ITransactionRepository transactionRepository)
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
    .Argument<StringGraphType>("Gone", "A flag indicating if the account should be marked as 'Gone'")
    .Argument<NonNullGraphType<StringGraphType>>("AccountID", "The ID of the account to delete")
    .ResolveAsync(async context =>
    {
        var accountID = context.GetArgument<string>("AccountID");
        var goneFlag = context.GetArgument<string>("Gone", defaultValue: null);

        var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var category = categoryRepository.GetServiceCategory(ServiceCategories.Gone);
        var accountTransactions = transactionRepository.GetAccountTransactions(Guid.Parse(accountID));

        decimal accountBalance = accountTransactions.Sum(t => t.Amount);



        var command = new AddCreditOperationCommand
        (
            UserId: userId,
            Title: "Gone",
            CategoryId: category.Id,
            FromAccountId: Guid.Parse(accountID),
            Amount: accountBalance,
            Note: "Gone",
            CreatedAt: DateTime.UtcNow
        );
        var deactivateCommand = new DeactivatePersonalAccountCommand
          (
              AccountId: accountID
          );

        if (accountBalance > 0)
        {

             await commandDispatcher.DispatchAsync(command);
             await commandDispatcher.DispatchAsync(deactivateCommand);
        }
        else
        {
            await commandDispatcher.DispatchAsync(deactivateCommand);
        }

        return true;
    }).Authorize();




        }
    }
}
