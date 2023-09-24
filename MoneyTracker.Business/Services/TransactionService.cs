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
        private readonly IReadModelExtensions readModelExtensions;
        public TransactionService(ITransactionRepository transactionRepository, IAccountRepository accountRepository, ICategoryRepository categoryRepository, IMapper mapper, IReadModelExtensions readModelExtensions)
        {
            this.transactionRepository = transactionRepository;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
            this.readModelExtensions = readModelExtensions;
        }

        public GetTransactionsDataDto GetTransactionsData(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null, Guid? categoryId = null, TransactionTypes? transactionType = null, DateTime? timeTravelDateTime = null)
        {
            var res = new GetTransactionsDataDto();

            var transactions = accountId == null
                ? GetPersonalAccountTransactions(userId, timeTravelDateTime)
                : transactionRepository!.GetAccountTransactions((Guid)accountId, timeTravelDateTime, readModelExtensions);

            transactions = FilterTransactionsByCatAndDate(transactions, categoryId, fromDate, toDate);
            transactions.Sort((t1, t2) => t1.CreatedAt.CompareTo(t2.CreatedAt));

            var categories = categoryRepository.GetCategories(userId, timeTravelDateTime, readModelExtensions);

            foreach (var transaction in transactions)
            {
                var category = categories.FirstOrDefault(c => c.Id == transaction.CategoryId);

                TransactionDto transactionDto = mapper.Map<TransactionDto>(transaction);

                if (category!.Name == ServiceCategories.MoneyTransfer.ToString())
                {
                    if (transaction.Amount > 0)
                    {
                        transactionDto.FromAccountId = transactionRepository.GetTransactionsByOperationId(transaction.OperationId, timeTravelDateTime, readModelExtensions).FirstOrDefault(t => t.Amount < 0)!.AccountId;
                        transactionDto.AccountName  = transactionDto.AccountName;
                    }
                    else
                    {
                        transactionDto.FromAccountId = transactionDto.AccountId;
                        transactionDto.AccountName = transactionDto.AccountName;
                        transactionDto.AccountId = transactionRepository.GetTransactionsByOperationId(transaction.OperationId, timeTravelDateTime, readModelExtensions).FirstOrDefault(t => t.Amount > 0)!.AccountId;
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
            var transferCatId = categoryRepository.GetServiceCategory(ServiceCategories.MoneyTransfer).Id;
            var userPersonalAccounts = accountRepository!.GetUserAccounts(userId, Entities.AccountType.Personal, dateTime, readModelExtensions);
            return userPersonalAccounts.SelectMany(account => transactionRepository!.GetAccountTransactions(account.Id, dateTime, readModelExtensions).Where(t => t.CategoryId != transferCatId)).ToList();
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

        private List<TransactionDto> FilterTransactionsByType(List<TransactionDto> transactions, TransactionTypes? type)
        {
            var filteredTransactions = transactions;

            if (type != null)
            {
                filteredTransactions = type switch
                {
                    TransactionTypes.Expense => filteredTransactions.Where(t => t.Amount < 0).ToList(),
                    TransactionTypes.Income => filteredTransactions.Where(t => t.Amount > 0).ToList(),
                    _ => filteredTransactions
                };
            }

            return filteredTransactions;
        }

        private void CalculateExpensesAndIncomes(GetTransactionsDataDto res, Guid? accountId)
        {
            var expenseTransactions = res.Transactions.Where(t => t.Category.Type == TransactionTypes.Expense);
            var incomeTransactions = res.Transactions.Where(t => t.Category.Type == TransactionTypes.Income);

            res.Expenses = expenseTransactions.Sum(t => t.Amount);
            res.Incomes = incomeTransactions.Sum(t => t.Amount);

            if (accountId != null)
            {
                var transferTransactions = res.Transactions.Where(t => t.Category.Name == ServiceCategories.MoneyTransfer.ToString());
                res.Expenses += transferTransactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
                res.Incomes += transferTransactions.Where(t => t.Amount > 0).Sum(t => t.Amount);
            }
        }
    }
}
