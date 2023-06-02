using Microsoft.AspNetCore.Http;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface ICookieService
    {
        void SetRefrshTokenCookie(string token, HttpContext context);

        string? GetRefreshTokenCookie(HttpContext context);
    }
}
