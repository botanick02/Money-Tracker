﻿using AutoMapper;
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

        public GetTransactionsDataDto GetTransactionsData(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null)
        {
            var res = new GetTransactionsDataDto();

            var transactions = new List<Transaction>();

            if (accountId == null) {
                var userPersonalAccounts = accountRepository!.GetUserAccounts(userId, Entities.AccountType.Personal);
                foreach ( var account in userPersonalAccounts )
                {
                    transactions.AddRange(transactionRepository!.GetAccountTransactions(account.Id));
                }
            }
            else
            {
                transactions.AddRange(transactionRepository!.GetAccountTransactions((Guid)accountId));
            }

            if (fromDate != null)
            {
                transactions = transactions.Where(t => t.CreatedAt > fromDate).ToList();
            }

            if (toDate != null)
            {
                transactions = transactions.Where(t => t.CreatedAt < toDate).ToList();
            }
            transactions = transactions.OrderBy(t => t.CreatedAt).ToList();

            var categories = categoryRepository.GetCategories();

            res.Transactions = mapper.Map<List<TransactionDto>>(transactions);

            foreach (var transaction in res.Transactions)
            {
                transaction.Category = categories.FirstOrDefault(c => c.Id == transaction.CategoryId)!;
            }

            res.Expenses = res.Transactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
            res.Incomes = res.Transactions.Where(t => t.Amount > 0).Sum(t => t.Amount);

            return res;
        }
    }
}
