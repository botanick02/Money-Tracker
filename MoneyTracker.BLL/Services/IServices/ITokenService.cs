using MoneyTracker.DAL.Entities;
using System.Security.Claims;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);

        string GenerateRefreshToken(User user);

        bool ValidateAccessToken(string token);

        bool ValidateRefreshToken(string token);

        ClaimsPrincipal GetPrincipalFromToken(string token);
    }
}
