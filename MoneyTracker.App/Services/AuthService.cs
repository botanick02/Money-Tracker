using MoneyTracker.Business.IRepositories;
using MoneyTracker.Business.Entities;
using System.Security.Claims;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.App.GraphQl.Auth.Types;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using MoneyTracker.App.Helpers;
using Google.Apis.Auth;
using GraphQLParser;

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

            if (user == null || !passwordHashService.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
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

                if (payload.ExpirationTimeSeconds.HasValue && DateTime.UtcNow.Millisecond > payload.ExpirationTimeSeconds.Value)
                {
                    throw new InvalidJwtException("");
                }

                var user = userRepository.GetUserByEmail(payload.Email);

                if (user == null)
                {

                }

            }
            catch (InvalidJwtException)
            {
                // Token is invalid
                return false;
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

            var user = userRepository.GetUserById(int.Parse(claimPrincipal.FindFirst(ClaimTypes.NameIdentifier)!.Value));
            

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
            var user = mapper.Map<User>(newUser);

            if (userRepository.GetUserByEmail(user.Email) != null)
            {
                throw new UserAlreadyExistsException();
            }


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
            var user = new User();



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

        public bool LogUserOut(HttpContext context)
        {
            var existingUser = userRepository.GetUserById(int.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)!.Value));

            existingUser.RefreshToken = "";

            userRepository.UpdateUser(existingUser);

            CookiesHelper.ClearRefreshTokenCookie(context);

            return true;
        }
    }

    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException()
        {
        }
    } 
    public class InvalidRefreshTokenException : Exception
    {
        public InvalidRefreshTokenException()
        {
        }
    }
}
