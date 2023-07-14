namespace MoneyTracker.Business.Commands.Auth
{
    public class RegisterUserCommand
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }
    }

    public class RegisterGoogleUserCommand
    {
        public string Email { get; set; }

        public string Name { get; set; }
    }

    public class SetUserRefreshTokenCommand
    {
        public Guid UserId { get; set; }

        public string? RefreshToken { get; set; }
    }
}
