using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class AccountDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Currency Currency { get; set; }

        public decimal Balance { get; set; }
    }
}