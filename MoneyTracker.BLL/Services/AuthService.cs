using MoneyTracker.BLL.DTO_s;
using MoneyTracker.BLL.Services.IServices;
using MoneyTracker.DAL.Entities;
using MoneyTracker.DAL.Repositories.IRepositories;

namespace MoneyTracker.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenService tokenService;
        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
        }
        public LoginResponseDto AuthenticateUser(string email, string password)
        {
            User user = userRepository.GetUserByEmail(email);

            if (user == null || !VerifyPassword(password, user.Password))
            {
                return new LoginResponseDto
                {
                    AccessToken = string.Empty,
                    RefreshToken = string.Empty
                };
            }

            string accessToken = tokenService.GenerateAccessToken(user);
            string refreshToken = tokenService.GenerateRefreshToken(user);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private bool VerifyPassword(string password, string storedPassword)
        {
            return string.Equals(password, storedPassword);
        }
    }
}
