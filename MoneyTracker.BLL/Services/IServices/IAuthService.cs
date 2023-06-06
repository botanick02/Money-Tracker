using Microsoft.AspNetCore.Http;
using MoneyTracker.BLL.DTO_s;
using MoneyTracker.BLL.DTO_s.User;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface IAuthService
    {
        LoginResponseDto AuthenticateUser(string email, string password, HttpContext context);

        bool LogUserOut(HttpContext context);

        LoginResponseDto RegisterUser(UserCreateDto newUser, HttpContext context);

        LoginResponseDto RefreshAccessToken(HttpContext context);
    }
}
