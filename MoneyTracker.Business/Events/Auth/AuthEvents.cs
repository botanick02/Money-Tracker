namespace MoneyTracker.Business.Events.Auth
{
    public record UserRegisteredEvent : Event
    {
        public Guid UserId { get; init; }

        public string Email { get; init; }

        public string Name { get; init; }

        public string PasswordHash { get; init; }

        public string PasswordSalt { get; init; }

        public bool GoogleAuth { get; } = false;
    }

    public record GoogleUserRegisteredEvent : Event
    {
        public Guid UserId { get; init; }

        public string Email { get; init; }

        public string Name { get; init; }


        public bool GoogleAuth { get; } = true;
    }

    public record UserRefreshTokenSetEvent : Event
    {
        public Guid UserId { get; init; }

        public string? RefreshToken { get; init; }
    }
}