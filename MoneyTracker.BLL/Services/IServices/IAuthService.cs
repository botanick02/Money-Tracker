using Microsoft.AspNetCore.Http;
using MoneyTracker.BLL.DTO_s;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface IAuthService
    {
        LoginResponseDto AuthenticateUser(string email, string password, HttpContext context);
        LoginResponseDto RefreshAccessToken(HttpContext context);
    }
}
