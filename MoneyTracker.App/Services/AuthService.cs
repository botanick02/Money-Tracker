using MoneyTracker.Business.Entities;
using System.Security.Claims;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.GraphQl.Auth.Types;
using AutoMapper;
using MoneyTracker.App.Helpers;
using Google.Apis.Auth;
using System.Runtime.Serialization;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Services
{
    public class AuthService
    {
        private readonly IUserRepository userRepository;
        private readonly TokenService tokenService;
        private readonly PasswordHashService passwordHashService;
        public AuthService(IUserRepository userRepository, TokenService tokenService, PasswordHashService passwordHashService)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
            this.passwordHashService = passwordHashService;
        }
        public async Task<LoginResponse> AuthenticateUser(string email, string password, HttpContext context)
        {
            var user = await userRepository.GetUserByEmailAsync(email);

            if (user == null || !passwordHashService.VerifyPassword(password, user.PasswordHash!, user.PasswordSalt!))
            {
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            var accessToken = await GenerateTokensAndSetCookiesAsync(user, context);

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public async Task<LoginResponse> AuthenticateGoogleUser(string googleToken, HttpContext context)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken);

                var user = await userRepository.GetUserByEmailAsync(payload.Email);

                if (user == null)
                {
                    return await RegisterGoogleUser(payload.Email, payload.Name, context);
                }

                var accessToken = await GenerateTokensAndSetCookiesAsync(user, context);

                return new LoginResponse
                {
                    AccessToken = accessToken,
                };
            }
            catch (InvalidJwtException)
            {
                throw new InvalidJwtException($"Invalid token");
            }
        }

        public async Task<LoginResponse> RefreshAccessToken(HttpContext context)
        {
            var oldRefreshToken = CookiesHelper.GetRefreshTokenCookie(context);

            if (oldRefreshToken == null || !tokenService.ValidateRefreshToken(oldRefreshToken))
            {
                throw new InvalidJwtException("Refresh token is invalid");
            }

            var claimPrincipal = tokenService.GetPrincipalFromToken(oldRefreshToken);

            var user = await userRepository.GetUserByIdAsync(claimPrincipal.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            
            if (user == null) {
                throw new InvalidJwtException("User doesn't not exist any more");
            }

            var accessToken = await GenerateTokensAndSetCookiesAsync(user, context);

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public async Task<LoginResponse> RegisterUser(UserCreateInput newUser, HttpContext context)
        {
            if (await userRepository.GetUserByEmailAsync(newUser.Email) != null)
            {
                throw new UserAlreadyExistsException();
            }

            var user = new User(newUser.Email, newUser.Name);

            user.PasswordHash = passwordHashService.HashPassword(newUser.Password, out string salt);
            user.PasswordSalt = salt;
            
            var createdUser = await userRepository.CreateUserAsync(user);

            if (createdUser == null)
            {
                throw new UserNotFoundException("User was not created or created incorrectly");
            }

            var accessToken = await GenerateTokensAndSetCookiesAsync(createdUser, context);

            return new LoginResponse
            {
                AccessToken = accessToken
            };
        }

        public async Task<LoginResponse> RegisterGoogleUser(string email, string name, HttpContext context)
        {
            var user = new User(email, name);

            var createdUser = await userRepository.CreateUserAsync(user);
            if (createdUser == null)
            {
                throw new UserNotFoundException("User was not created or created incorrectly");
            }

            var accessToken = await GenerateTokensAndSetCookiesAsync(createdUser, context);

            return new LoginResponse
            {
                AccessToken = accessToken
            };
        }

        public async Task<bool> LogUserOut(HttpContext context)
        {
            var existingUser = await userRepository.GetUserByIdAsync(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (existingUser != null)
            {
                existingUser.RefreshToken = null;
                await userRepository.UpdateUserAsync(existingUser);
            }

            CookiesHelper.ClearRefreshTokenCookie(context);

            return true;
        }

        private async Task<string> GenerateTokensAndSetCookiesAsync(User user, HttpContext context)
        {
            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            await userRepository.UpdateUserAsync(user);

            return accessToken;
        }
    }



    [Serializable]
    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException()
        {
        }

        protected UserAlreadyExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message)
        {
        }

        protected UserNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
