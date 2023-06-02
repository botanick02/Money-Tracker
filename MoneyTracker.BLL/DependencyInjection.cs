using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.BLL.Services;
using MoneyTracker.BLL.Services.IServices;
using MoneyTracker.BLL.Utilities;
using MoneyTracker.DAL;

namespace MoneyTracker.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperProfile));
            services.AddSingleton<IAuthService, AuthService>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.RegisterDALDependencies();
        }
    }
}
