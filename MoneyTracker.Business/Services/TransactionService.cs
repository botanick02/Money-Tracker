using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Services
{
    public class TransactionService
    {
        private readonly ITransactionRepository transactionRepository;
        private readonly IAccountRepository accountRepository;
        public TransactionService(ITransactionRepository transactionRepository, IAccountRepository accountRepository)
        {
            this.transactionRepository = transactionRepository;
            this.accountRepository = accountRepository;
        }

        public GetTransactionsDto GetTransactionsData(Guid userId, Guid? accountId = null)
        {
            var res = new GetTransactionsDto();
            if (accountId == null) {
                var userPersonalAccounts = accountRepository!.GetUserAccounts(userId, Entities.AccountType.Personal);
                foreach ( var account in userPersonalAccounts )
                {
                    res.Transactions.AddRange(transactionRepository!.GetAccountTransactions(account.Id));
                }
            }
            else
            {
                res.Transactions.AddRange(transactionRepository!.GetAccountTransactions((Guid)accountId));
            }

            res.Transactions = res.Transactions.OrderBy(t => t.CreatedAt).ToList();

            res.Expenses = res.Transactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
            res.Incomes = res.Transactions.Where(t => t.Amount > 0).Sum(t => t.Amount);

            return res;
        }
    }
}
