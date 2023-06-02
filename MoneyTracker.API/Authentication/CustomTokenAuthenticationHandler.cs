using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MoneyTracker.BLL.Services.IServices;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace MoneyTracker.API.Authentication
{
    public class CustomTokenAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly ITokenService tokenService;
        public CustomTokenAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, ITokenService tokenService)
            : base(options, logger, encoder, clock)
        {
            this.tokenService = tokenService;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.Fail("Missing authorization header");
            }

            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (!tokenService.ValidateAccessToken(token))
            {
                return AuthenticateResult.Fail("Invalid token");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, "Authorized")
            };

            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
