using Microsoft.AspNetCore.Http;

namespace MoneyTracker.Business.Services
{
    public class CookiesService
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
        public void ClearRefreshTokenCookie(HttpContext context)
        {
            context.Response.Cookies.Delete("refreshToken");
        }
    }
}
