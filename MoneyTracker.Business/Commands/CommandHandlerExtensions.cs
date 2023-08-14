using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.Commands.Account;
using MoneyTracker.Business.Commands.Auth;
using MoneyTracker.Business.Commands.Budget;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Commands.FinancialOperation;
using MoneyTracker.Business.Events.Account;
using static MoneyTracker.Business.Commands.Account.AccountCommandsHandler;
using static MoneyTracker.Business.Commands.Auth.AuthCommandsHandler;

namespace MoneyTracker.Business.Commands
{
    public static class CommandHandlerExtensions
    {
        public static void ConfigureCommandHandlers(this IServiceCollection services)
        {
            services.AddTransient<CommandDispatcher>();

            services.AddTransient<ICommandHandler<CreateBudgetCommand>, CreateBudgetCommandHandler>();
            services.AddTransient<ICommandHandler<DeleteBudgetCommand>, DeleteBudgetCommandHandler>();
            services.AddTransient<ICommandHandler<EditBudgetCommand>, EditBudgetCommandHandler>();

            services.AddTransient<ICommandHandler<CreateCategoryCommand>, CreateCategoryCommandHandler>();
            services.AddTransient<ICommandHandler<UpdateCategoryCommand>, UpdateCategoryCommandHandler>();
            services.AddTransient<ICommandHandler<DeactivateCategoryCommand>, DeactivateCategoryCommandHandler>();

            services.AddTransient<ICommandHandler<RegisterUserCommand>, RegisterUserCommandHandler>();
            services.AddTransient<ICommandHandler<RegisterGoogleUserCommand>, RegisterGoogleUserCommandHandler>();
            services.AddTransient<ICommandHandler<SetUserRefreshTokenCommand>, SetUserRefreshTokenCommandHandler>();
            services.AddTransient<ICommandHandler<AddDebitOperationCommand>, AddDebitOperationCommandHandler>();
            services.AddTransient<ICommandHandler<AddCreditOperationCommand>, AddCreditOperationCommandHandler>();
            services.AddTransient<ICommandHandler<AddTransferOperationCommand>, AddTransferOperationCommandHandler>();
            services.AddTransient<ICommandHandler<CancelFinancialOperationCommand>, CancelFinancialOperationCommandHandler>();
            services.AddTransient<ICommandHandler<UpdateFinancialOperationCommand>, UpdateFinancialOperationCommandHandler>();
            services.AddTransient<ICommandHandler<CreatePersonalAccountCommand>, CreatePersonalAccountCommandHandler>();
        }
    }
}
