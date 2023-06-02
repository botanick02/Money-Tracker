using Microsoft.AspNetCore.Http;
using MoneyTracker.BLL.Services.IServices;

namespace MoneyTracker.BLL.Services
{
    internal class CookiesService : ICookieService
    {
        public void SetRefrshTokenCookie(string token, HttpContext context)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                SameSite = SameSiteMode.None,
                Secure = true,
            };
            context.Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
        public string? GetRefreshTokenCookie(HttpContext context)
        {
            return context.Request.Cookies["refreshToken"];
        }
    }
}
