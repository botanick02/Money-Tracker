using Microsoft.AspNetCore.Http;
using MoneyTracker.BLL.DTO_s;
using MoneyTracker.BLL.DTO_s.User;
using MoneyTracker.BLL.Services.IServices;
using MoneyTracker.DAL.Entities;
using MoneyTracker.DAL.Repositories.IRepositories;
using System.Security.Claims;

namespace MoneyTracker.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenService tokenService;
        private readonly ICookieService cookieService;
        private readonly IPasswordHashService passwordHashService;
        public AuthService(IUserRepository userRepository, ITokenService tokenService, ICookieService cookieService, IPasswordHashService passwordHashService)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
            this.cookieService = cookieService;
            this.passwordHashService = passwordHashService;
        }
        public LoginResponseDto AuthenticateUser(string email, string password, HttpContext context)
        {
            var user = userRepository.GetUserByEmail(email);

            if (user == null || !passwordHashService.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return new LoginResponseDto
                {
                    AccessToken = string.Empty,
                };
            }

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            cookieService.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            userRepository.UpdateUser(user);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
            };
        }

        public LoginResponseDto RefreshAccessToken(HttpContext context)
        {
            var oldRefreshToken = cookieService.GetRefreshTokenCookie(context);

            if (!tokenService.ValidateRefreshToken(oldRefreshToken))
            {
                return new LoginResponseDto
                {
                    AccessToken = string.Empty
                };
            }

            var claimPrincipal = tokenService.GetPrincipalFromToken(oldRefreshToken);

            var user = userRepository.GetUserById(int.Parse(claimPrincipal.FindFirst(ClaimTypes.NameIdentifier)!.Value));
            

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            cookieService.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            userRepository.UpdateUser(user);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
            };
        }

        public LoginResponseDto RegisterUser(UserCreateDto newUser, HttpContext context)
        {
            var user = new User();

            user.Name = newUser.Name;
            user.Email = newUser.Email;

            user.PasswordHash = passwordHashService.HashPassword(newUser.Password, out string salt);
            user.PasswordSalt = salt;
            
            var createdUser = userRepository.CreateUser(user);

            var accessToken = tokenService.GenerateAccessToken(createdUser);
            var refreshToken = tokenService.GenerateRefreshToken(createdUser);

            cookieService.SetRefrshTokenCookie(refreshToken, context);
            user.RefreshToken = refreshToken;

            userRepository.UpdateUser(createdUser);

            return new LoginResponseDto
            {
                AccessToken = accessToken
            };
        }
    }
}
