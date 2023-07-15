namespace MoneyTracker.Business.Events.Auth
{
    public record UserRegisteredEvent(Guid UserId, string Email, string Name, string PasswordHash, string PasswordSalt)
    : Event
    {
        public bool GoogleAuth { get; init; } = false;
    }

    public record GoogleUserRegisteredEvent(Guid UserId, string Email, string Name)
    : Event
    {
        public bool GoogleAuth { get; init; } = true;
    }

    public record UserRefreshTokenSetEvent(Guid UserId, string? RefreshToken)
    : Event;
}