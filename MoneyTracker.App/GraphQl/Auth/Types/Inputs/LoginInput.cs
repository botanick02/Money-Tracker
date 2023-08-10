using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class LoginInput
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 6 characters long")]
        public string? Password { get; set; }
    }
}
