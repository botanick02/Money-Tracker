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

        public GetAccountsDto GetUserPersonalAccounts(Guid userId, DateTime? travelDateTime = null)
        {
            var resultDto = new GetAccountsDto();

            var userAccounts = accountRepository.GetUserAccounts(userId, AccountType.Personal, travelDateTime);

            foreach (var account in userAccounts)
            {
                var accountTransactions = transactionRepository.GetAccountTransactions(account.Id, travelDateTime);

                decimal accountBalance = accountTransactions.Sum(t => t.Amount);

                AccountDto accountDto = new AccountDto
                {
                    Id = account.Id,
                    Name = account.Name,
                    Currency = account.Currency,
                    Balance = accountBalance,
                };

                resultDto.Accounts.Add(accountDto);
            }

            resultDto.Total = resultDto.Accounts.Sum(a => a.Balance);

            return resultDto;
        }
    }
}
