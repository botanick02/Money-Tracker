using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class GoogleLoginInput
    {
        [Required]
        public string? Token { get; set; }
    }
}
