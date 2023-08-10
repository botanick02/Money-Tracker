using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class GoogleLoginInput
    {
        [Required(ErrorMessage = "Token is required")]
        public string? Token { get; set; }
    }
}
