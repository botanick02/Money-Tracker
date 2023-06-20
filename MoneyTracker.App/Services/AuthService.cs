using MoneyTracker.Business.IRepositories;
using MoneyTracker.Business.Entities;
using System.Security.Claims;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.GraphQl.Auth.Types;
using AutoMapper;
using MoneyTracker.App.Helpers;
using Google.Apis.Auth;
using GraphQLParser;
using System.Runtime.Serialization;

namespace MoneyTracker.Business.Services
{
    public class AuthService
    {
        private readonly IUserRepository userRepository;
        private readonly TokenService tokenService;
        private readonly PasswordHashService passwordHashService;
        private readonly IMapper mapper;
        public AuthService(IUserRepository userRepository, TokenService tokenService, PasswordHashService passwordHashService, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
            this.passwordHashService = passwordHashService;
            this.mapper = mapper;
        }
        public LoginResponse AuthenticateUser(string email, string password, HttpContext context)
        {
            var user = userRepository.GetUserByEmail(email);


            if (user == null || !passwordHashService.VerifyPassword(password, user.PasswordHash!, user.PasswordSalt!))
            {
                throw new InvalidDataException("Invalid username or password.");
            }

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            userRepository.UpdateUser(user);

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public async Task<LoginResponse> AuthenticateUser(string googleToken, HttpContext context)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken);

                if (payload.ExpirationTimeSeconds.HasValue && DateTime.UtcNow.Second > payload.ExpirationTimeSeconds.Value)
                {
                    throw new InvalidJwtException("");
                }

                var user = userRepository.GetUserByEmail(payload.Email);

                if (user == null)
                {
                    return RegisterGoogleUser(payload.Email, payload.Name, context);
                }

                var accessToken = tokenService.GenerateAccessToken(user);
                var refreshToken = tokenService.GenerateRefreshToken(user);

                CookiesHelper.SetRefrshTokenCookie(refreshToken, context);

                user.RefreshToken = refreshToken;
                userRepository.UpdateUser(user);

                return new LoginResponse
                {
                    AccessToken = accessToken,
                };
            }
            catch (InvalidJwtException ex)
            {
                throw new InvalidDataException($"Invalid token {ex}");
            }
        }

        public LoginResponse RefreshAccessToken(HttpContext context)
        {
            var oldRefreshToken = CookiesHelper.GetRefreshTokenCookie(context);

            if (oldRefreshToken == null || !tokenService.ValidateRefreshToken(oldRefreshToken))
            {
                throw new InvalidRefreshTokenException();
            }

            var claimPrincipal = tokenService.GetPrincipalFromToken(oldRefreshToken);

            var user = userRepository.GetUserById(claimPrincipal.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            
            if (user == null) {
                throw new UserNotFoundException();
            }

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken(user);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);

            user.RefreshToken = refreshToken;
            userRepository.UpdateUser(user);

            return new LoginResponse
            {
                AccessToken = accessToken,
            };
        }

        public LoginResponse RegisterUser(UserCreateInput newUser, HttpContext context)
        {
            if (userRepository.GetUserByEmail(newUser.Email) != null)
            {
                throw new UserAlreadyExistsException();
            }

            var newId = Guid.NewGuid().ToString();
            var user = new User(newId, newUser.Email, newUser.Name);

            user.PasswordHash = passwordHashService.HashPassword(newUser.Password, out string salt);
            user.PasswordSalt = salt;
            
            var createdUser = userRepository.CreateUser(user);

            var accessToken = tokenService.GenerateAccessToken(createdUser);
            var refreshToken = tokenService.GenerateRefreshToken(createdUser);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);
            user.RefreshToken = refreshToken;

            userRepository.UpdateUser(createdUser);

            return new LoginResponse
            {
                AccessToken = accessToken
            };
        }

        public LoginResponse RegisterGoogleUser(string email, string name, HttpContext context)
        {

            var newId = Guid.NewGuid().ToString();
            var user = new User(newId, email, name);

            var createdUser = userRepository.CreateUser(user);

            if (createdUser == null) 
            {
                throw new InvalidDataException("User was not created or created incorrectly");
            }

            var accessToken = tokenService.GenerateAccessToken(createdUser);
            var refreshToken = tokenService.GenerateRefreshToken(createdUser);

            CookiesHelper.SetRefrshTokenCookie(refreshToken, context);
            user.RefreshToken = refreshToken;

            userRepository.UpdateUser(createdUser);

            return new LoginResponse
            {
                AccessToken = accessToken
            };
        }

        public bool LogUserOut(HttpContext context)
        {
            var existingUser = userRepository.GetUserById(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (existingUser != null)
            {
                existingUser.RefreshToken = null;
                userRepository.UpdateUser(existingUser);
            }

            CookiesHelper.ClearRefreshTokenCookie(context);

            return true;
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
    public class InvalidRefreshTokenException : Exception
    {
        public InvalidRefreshTokenException()
        {
        }

        protected InvalidRefreshTokenException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
        {
        }

        protected UserNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
