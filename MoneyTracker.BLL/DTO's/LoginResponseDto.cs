namespace MoneyTracker.BLL.DTO_s
{
    public class LoginResponseDto
    {
        public string RefreshToken { get; set; } = string.Empty;

        public string AccessToken { get; set; } = string.Empty;
    }
}
