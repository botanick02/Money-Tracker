using MoneyTracker.Business.Entities;
using System.Security.Claims;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.GraphQl.Auth.Types;
using MoneyTracker.App.Helpers;
using Google.Apis.Auth;
using System.Runtime.Serialization;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Auth;

namespace MoneyTracker.Business.Services
{
    public class AuthService
    {
        private readonly IUserRepository userRepository;
        private readonly TokenService tokenService;
        private readonly PasswordHashService passwordHashService;
        private readonly CommandDispatcher commandDispatcher;
        public AuthService(IUserRepository userRepository, TokenService tokenService, PasswordHashService passwordHashService, CommandDispatcher commandDispatcher)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
            this.passwordHashService = passwordHashService;
            this.commandDispatcher = commandDispatcher;
        }
        public async Task<LoginResponse> AuthenticateUser(string email, string password, HttpContext context)
        {
            var user = userRepository.GetUserByEmail(email);

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

                var user = userRepository.GetUserByEmail(payload.Email);

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

            var user = userRepository.GetUserById(Guid.Parse(claimPrincipal.FindFirst(ClaimTypes.NameIdentifier)!.Value));
            
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
            if (userRepository.GetUserByEmail(newUser.Email) != null)
            {
                throw new UserAlreadyExistsException();
            }


            var command = new RegisterUserCommand
            {
                Email = newUser.Email,
                Name = newUser.Name,
                PasswordHash = passwordHashService.HashPassword(newUser.Password, out string salt),
                PasswordSalt = salt,
            };

            commandDispatcher.Dispatch(command);

            var createdUser = await TryGetCreatedUser(newUser.Email);

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
            var command = new RegisterGoogleUserCommand
            {
                Email = email,
                Name = name,
            };

            commandDispatcher.Dispatch(command);

            var createdUser = await TryGetCreatedUser(email);

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
            var existingUser = userRepository.GetUserById(Guid.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value));

            if (existingUser == null)
            {
                return true;
            }

            CookiesHelper.ClearRefreshTokenCookie(context);
            await SetUserRefreshToken(existingUser.Id, null);

            return true;
        }

        private async Task<string> GenerateTokensAndSetCookiesAsync(User user, HttpContext context)
        {
            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);

            await SetUserRefreshToken(user.Id, refreshToken);

            return accessToken;
        }

        private async Task<bool> SetUserRefreshToken(Guid userId, string? refreshToken)
        {
            var command = new SetUserRefreshTokenCommand
            {
                UserId = userId,
                RefreshToken = refreshToken,
            };

            commandDispatcher.Dispatch(command);

            return true;
        }

        private async Task<User?> TryGetCreatedUser(string email)
        {
            for (int attempts = 0; attempts < 5; attempts++)
            {
                var user = userRepository.GetUserByEmail(email);
                if (user != null)
                {
                    return user;
                }

                Thread.Sleep(1000); 
            }
            return null;
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
