using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.Business.Entities
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }

        public string Email { get; set; }

        public bool GoogleAuth { get; set; }

        public string? PasswordHash { get; set; }

        public string? PasswordSalt { get; set; }

        public string? RefreshToken { get; set; }

        public User(string email, string name)
        {
            Name = name;
            Email = email;
        }
    }
}
