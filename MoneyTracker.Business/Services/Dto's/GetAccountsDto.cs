namespace MoneyTracker.Business.Services.Dto_s
{
    public class GetAccountsDto
    {
        public List<AccountDto> Accounts { get; set; } = new List<AccountDto>();

        public decimal Total { get; set; }
        public bool IsActive { get; set; }
    }
}
