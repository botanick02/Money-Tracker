using MoneyTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

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
