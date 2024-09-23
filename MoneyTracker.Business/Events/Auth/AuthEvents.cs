namespace MoneyTracker.Business.Events.Auth
{
    public record UserRegisteredEvent(Guid UserId, string Email, string Name, string PasswordHash, string PasswordSalt)
    : BaseEvent
    {
        public bool GoogleAuth { get; init; } = false;
    }

    public record GoogleUserRegisteredEvent(Guid UserId, string Email, string Name)
    : BaseEvent
    {
        public bool GoogleAuth { get; init; } = true;
    }

    public record UserRefreshTokenSetEvent(Guid UserId, string? RefreshToken)
    : BaseEvent;
}