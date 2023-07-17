using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Services
{
    public class AccountService
    {
        private readonly IAccountRepository accountRepository;
        private readonly ITransactionRepository transactionRepository;
        public AccountService(IAccountRepository accountRepository, ITransactionRepository transactionRepository)
        {
            this.accountRepository = accountRepository;
            this.transactionRepository = transactionRepository;
        }

        public List<AccountDto> GetUserPersonalAccounts(Guid userId)
        {
            List<AccountDto> accountDtos = new List<AccountDto>();

            var userAccounts = accountRepository.GetUserAccounts(userId, AccountType.Personal);

            foreach (var account in userAccounts)
            {
                var accountTransactions = transactionRepository.GetAccountTransactions(account.Id);

                decimal accountBalance = accountTransactions.Sum(t => t.Amount);

                AccountDto accountDto = new AccountDto
                {
                    Id = account.Id,
                    Name = account.Name,
                    Currency = account.Currency,
                    Balance = accountBalance,
                };

                accountDtos.Add(accountDto);
            }

            return accountDtos;
        }
    }
}
