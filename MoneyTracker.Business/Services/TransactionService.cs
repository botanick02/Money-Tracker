using AutoMapper;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Services
{
    public class TransactionService
    {
        private readonly ITransactionRepository transactionRepository;
        private readonly IAccountRepository accountRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;
        public TransactionService(ITransactionRepository transactionRepository, IAccountRepository accountRepository, ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.transactionRepository = transactionRepository;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        public GetTransactionsDataDto GetTransactionsData(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null, Guid? categoryId = null, string? transactionType = null)
        {
            var res = new GetTransactionsDataDto();

            var transactions = accountId == null
                ? GetPersonalAccountTransactions(userId)
                : transactionRepository!.GetAccountTransactions((Guid)accountId);

            transactions = FilterTransactionsByCatAndDate(transactions, categoryId, fromDate, toDate);
            transactions.Sort((t1, t2) => t1.CreatedAt.CompareTo(t2.CreatedAt));

            var categories = categoryRepository.GetCategories(userId);
            res.Transactions = mapper.Map<List<TransactionDto>>(transactions);

            foreach (var transaction in res.Transactions)
            {
                transaction.Category = categories.FirstOrDefault(c => c.Id == transaction.CategoryId)!;
            }

            CalculateExpensesAndIncomes(res, accountId);

            res.Transactions = FilterTransactionsByType(res.Transactions, transactionType);

            return res;
        }

        private List<Transaction> GetPersonalAccountTransactions(Guid userId)
        {
            var userPersonalAccounts = accountRepository!.GetUserAccounts(userId, Entities.AccountType.Personal);
            return userPersonalAccounts.SelectMany(account => transactionRepository!.GetAccountTransactions(account.Id)).ToList();
        }

        private List<Transaction> FilterTransactionsByCatAndDate(List<Transaction> transactions, Guid? categoryId, DateTime? fromDate, DateTime? toDate)
        {
            var filteredTransactions = transactions;

            if (categoryId != null)
            {
                filteredTransactions = filteredTransactions.Where(t => t.CategoryId == categoryId).ToList();
            }

            if (fromDate != null)
            {
                filteredTransactions = filteredTransactions.Where(t => t.CreatedAt > fromDate).ToList();
            }

            if (toDate != null)
            {
                filteredTransactions = filteredTransactions.Where(t => t.CreatedAt < toDate).ToList();
            }

           

            return filteredTransactions;
        }

        private List<TransactionDto> FilterTransactionsByType(List<TransactionDto> transactions, string? transactionType)
        {
            var filteredTransactions = transactions;

            if (transactionType != null)
            {
                filteredTransactions = transactionType switch
                {
                    "expense" => filteredTransactions.Where(t => t.Amount < 0).ToList(),
                    "income" => filteredTransactions.Where(t => t.Amount > 0).ToList(),
                    _ => filteredTransactions
                };
            }

            return filteredTransactions;
        }

        private void CalculateExpensesAndIncomes(GetTransactionsDataDto res, Guid? accountId)
        {
            var expenseTransactions = res.Transactions.Where(t => t.Category.Type == "expense");
            var incomeTransactions = res.Transactions.Where(t => t.Category.Type == "income");

            res.Expenses = expenseTransactions.Sum(t => t.Amount);
            res.Incomes = incomeTransactions.Sum(t => t.Amount);

            if (accountId != null)
            {
                var transferTransactions = res.Transactions.Where(t => t.Category.Type == "transfer");
                res.Expenses += transferTransactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
                res.Incomes += transferTransactions.Where(t => t.Amount > 0).Sum(t => t.Amount);
            }
        }
    }
}
