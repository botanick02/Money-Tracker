using Microsoft.IdentityModel.Tokens;
using MoneyTracker.BLL.Services.IServices;
using MoneyTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.BLL.Services
{
    public class TokenService : ITokenService
    {
        private readonly string accessTokenSecret;
        private readonly string refreshTokenSecret;
        private readonly int accessTokenExpirationMinutes;
        private readonly int refreshTokenExpirationDays;
        public TokenService() 
        {
            accessTokenSecret = "-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVk";
            refreshTokenSecret = "-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVk";
            accessTokenExpirationMinutes = 5;
            refreshTokenExpirationDays = 1;
        }
        public string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(accessTokenSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),
                Expires = DateTime.UtcNow.AddMinutes(accessTokenExpirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(refreshTokenSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
                Expires = DateTime.UtcNow.AddDays(refreshTokenExpirationDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateAccessToken(string token)
        {
            throw new NotImplementedException();
        }

        public bool ValidateRefreshToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}
