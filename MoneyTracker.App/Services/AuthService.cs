using MoneyTracker.Business.IRepositories;
using MoneyTracker.Business.Entities;
using System.Security.Claims;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.GraphQl.Auth.Types;

namespace MoneyTracker.Business.Services
{
    public class AuthService
    {
        private readonly IUserRepository userRepository;
        private readonly TokenService tokenService;
        private readonly CookiesService cookieService;
        private readonly PasswordHashService passwordHashService;
        public AuthService(IUserRepository userRepository, TokenService tokenService, CookiesService cookieService, PasswordHashService passwordHashService)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
            this.cookieService = cookieService;
            this.passwordHashService = passwordHashService;
        }
        public LoginResponse AuthenticateUser(string email, string password, HttpContext context)
        {
            var user = userRepository.GetUserByEmail(email);

            if (user == null || !passwordHashService.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new InvalidDataException("Invalid username or password.");
            }

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            cookieService.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            userRepository.UpdateUser(user);

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public LoginResponse RefreshAccessToken(HttpContext context)
        {
            var oldRefreshToken = cookieService.GetRefreshTokenCookie(context);

            if (!tokenService.ValidateRefreshToken(oldRefreshToken))
            {
                return new LoginResponse
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

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public LoginResponse RegisterUser(UserCreateInput newUser, HttpContext context)
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

            return new LoginResponse
            {
                AccessToken = accessToken
            };
        }

        public bool LogUserOut(HttpContext context)
        {
            var existingUser = userRepository.GetUserById(int.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value));

            existingUser.RefreshToken = "";

            userRepository.UpdateUser(existingUser);

            cookieService.ClearRefreshTokenCookie(context);

            return true;
        }
    }
}
