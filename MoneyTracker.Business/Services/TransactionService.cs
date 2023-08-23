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

        public GetTransactionsDataDto GetTransactionsData(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null, Guid? categoryId = null, string? transactionType = null, DateTime? timeTravelDateTime = null)
        {
            var res = new GetTransactionsDataDto();

            var transactions = accountId == null
                ? GetPersonalAccountTransactions(userId, timeTravelDateTime)
                : transactionRepository!.GetAccountTransactions((Guid)accountId, timeTravelDateTime);

            transactions = FilterTransactionsByCatAndDate(transactions, categoryId, fromDate, toDate);
            transactions.Sort((t1, t2) => t1.CreatedAt.CompareTo(t2.CreatedAt));

            var categories = categoryRepository.GetCategories(userId, timeTravelDateTime);

            foreach (var transaction in transactions)
            {
                var category = categories.FirstOrDefault(c => c.Id == transaction.CategoryId);

                TransactionDto transactionDto = mapper.Map<TransactionDto>(transaction);

                if (category!.Type == "transfer")
                {
                    if (transaction.Amount > 0)
                    {
                        transactionDto.FromAccountId = transactionRepository.GetTransactionsByOperationId(transaction.OperationId, timeTravelDateTime).FirstOrDefault(t => t.Amount < 0)!.AccountId;
                    }
                    else
                    {
                        transactionDto.FromAccountId = transactionDto.AccountId;
                        transactionDto.AccountId = transactionRepository.GetTransactionsByOperationId(transaction.OperationId, timeTravelDateTime).FirstOrDefault(t => t.Amount > 0)!.AccountId;
                    }
                }
                res.Transactions.Add(transactionDto);

                transactionDto.Category = category;
            }

            CalculateExpensesAndIncomes(res, accountId);

            res.Transactions = FilterTransactionsByType(res.Transactions, transactionType);

            return res;
        }

        private List<Transaction> GetPersonalAccountTransactions(Guid userId, DateTime? dateTime = null)
        {
            var userPersonalAccounts = accountRepository!.GetUserAccounts(userId, Entities.AccountType.Personal, dateTime);
            return userPersonalAccounts.SelectMany(account => transactionRepository!.GetAccountTransactions(account.Id, dateTime)).ToList();
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
