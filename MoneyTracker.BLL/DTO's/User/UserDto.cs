namespace MoneyTracker.BLL.DTO_s.User
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string RefreshToken { get; set; } = string.Empty;
    }
}
