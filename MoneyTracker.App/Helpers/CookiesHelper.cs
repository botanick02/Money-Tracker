using Microsoft.AspNetCore.Http;

namespace MoneyTracker.App.Helpers
{
    public static class CookiesHelper
    {
        public static void SetRefrshTokenCookie(string token, HttpContext context)
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
        public static string? GetRefreshTokenCookie(HttpContext context)
        {
            return context.Request.Cookies["refreshToken"];
        }
        public static void ClearRefreshTokenCookie(HttpContext context)
        {
            context.Response.Cookies.Delete("refreshToken");
        }
    }
}
