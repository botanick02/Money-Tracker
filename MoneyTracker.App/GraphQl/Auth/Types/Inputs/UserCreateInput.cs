namespace MoneyTracker.App.GraphQl.Auth.Types.Inputs
{
    public class UserCreateInput
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
