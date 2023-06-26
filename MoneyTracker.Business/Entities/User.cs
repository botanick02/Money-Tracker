using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.Business.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string? PasswordHash { get; set; }

        public string? PasswordSalt { get; set; }

        public string? RefreshToken { get; set; }

        public User(Guid id, string email, string name)
        {
            Id = id;
            Name = name;
            Email = email;
        }
    }
}
