using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.Commands.Auth;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Commands.FinancialOperation;

namespace MoneyTracker.Business.Commands
{
    public static class CommandHandlerExtensions
    {
        public static void ConfigureCommandHandlers(this IServiceCollection services)
        {
            services.AddTransient<CommandDispatcher>();
            services.AddTransient<ICommandHandler<CreateCategoryCommand>, CreateCategoryCommandHandler>();
            services.AddTransient<ICommandHandler<UpdateCategoryNameCommand>, UpdateCategoryNameCommandHandler>();
            services.AddTransient<ICommandHandler<RegisterUserCommand>, RegisterUserCommandHandler>();
            services.AddTransient<ICommandHandler<RegisterGoogleUserCommand>, RegisterGoogleUserCommandHandler>();
            services.AddTransient<ICommandHandler<SetUserRefreshTokenCommand>, SetUserRefreshTokenCommandHandler>();
            services.AddTransient<ICommandHandler<AddFinancialOperationCommand>, AddFinancialOperationCommandHandler>();
            services.AddTransient<ICommandHandler<CancelFinancialOperationCommand>, CancelFinancialOperationCommandHandler>();
        }
    }
}
