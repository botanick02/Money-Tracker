namespace MoneyTracker.Business.Events.Auth
{
    public class AuthEvents
    {
        public class UserRegisteredEvent
        {
            public Guid UserId { get; set; }

            public string Email { get; set; }

            public string Name { get; set; }

            public string PasswordHash { get; set; }

            public string PasswordSalt { get; set; }

            public bool GoogleAuth { get; } = false;
        }

        public class GoogleUserRegisteredEvent
        {
            public Guid UserId { get; set; }

            public string Email { get; set; }

            public string Name { get; set; }


            public bool GoogleAuth { get; } = true;
        }

        public class UserRefreshTokenSetEvent
        {
            public Guid UserId { get; set; }

            public string? RefreshToken { get; set; }
        }
    }
}
