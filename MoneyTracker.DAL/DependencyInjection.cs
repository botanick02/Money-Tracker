using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.DAL.Repositories;
using MoneyTracker.DAL.Repositories.IRepositories;

namespace MoneyTracker.DAL
{
    public static class DependencyInjection
    {
        public static void RegisterDALDependencies(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
        }
    }
}