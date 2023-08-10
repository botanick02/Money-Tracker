namespace MoneyTracker.Business.Commands.Auth
{
    public record RegisterUserCommand(string Email, string Name, string PasswordHash, string PasswordSalt);

    public record RegisterGoogleUserCommand(string Email, string Name);

    public record SetUserRefreshTokenCommand(Guid UserId, string? RefreshToken);
}
