using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MoneyTracker.Business.Services;
using System.Text.Encodings.Web;

namespace MoneyTracker.App.Authentication
{
    public class CustomTokenAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly TokenService tokenService;
        public CustomTokenAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, TokenService tokenService)
            : base(options, logger, encoder, clock)
        {
            this.tokenService = tokenService;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.NoResult();
            }

            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            try
            {
                var claimsPrincipal = tokenService.GetPrincipalFromToken(token);
                var authenticationTicket = new AuthenticationTicket(claimsPrincipal, Scheme.Name);
                return AuthenticateResult.Success(authenticationTicket);
            }
            catch
            {
                return AuthenticateResult.NoResult();
            }
        }
    }
}
