using System;
using System.Collections.Generic;
using System.Linq;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Services
{
    public class StatisticService
    {
        private readonly ITransactionRepository transactionRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IAccountRepository accountRepository;
        private readonly IReadModelExtensions readModelExtensions;

        public StatisticService(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository, IAccountRepository accountRepository, IReadModelExtensions readModelExtensions)
        {
            this.transactionRepository = transactionRepository;
            this.categoryRepository = categoryRepository;
            this.accountRepository = accountRepository;
            this.readModelExtensions = readModelExtensions;
        }

        public (List<GetStatiscicsDto> positiveTransactions, List<GetStatiscicsDto> negativeTransactions) GetStatistics(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null, DateTime? timeTravelDateTime = null)
        {
            var transactions = transactionRepository.GetUserTransactions(userId, timeTravelDateTime, readModelExtensions);
            var categories = categoryRepository.GetCategories(userId, timeTravelDateTime, readModelExtensions);

            var accounts = accountRepository.GetUserAccounts(userId, AccountType.Personal, timeTravelDateTime, readModelExtensions);

            var personalTransactions = transactions.Where(t => accounts.Any(a => a.Id == t.AccountId));
            if (accountId.HasValue)
            {
                personalTransactions = personalTransactions.Where(t => t.AccountId == accountId.Value);
            }

            var negativeTransactions = personalTransactions.Where(t => t.Amount < 0);
            var positiveTransactions = personalTransactions.Where(t => t.Amount >= 0);

            decimal totalNegativeSum = negativeTransactions.Sum(t => t.Amount * -1);
            decimal totalPositiveSum = positiveTransactions.Sum(t => t.Amount);

            var categorySums = personalTransactions
                .GroupBy(t => t.CategoryId)
                .Select(group => new
                {
                    CategoryId = group.Key,
                    Sum = group.Sum(t => t.Amount)
                })
                .ToList();

            var negativeSum = categorySums.Where(c => c.Sum < 0).Sum(c => c.Sum);
            var positiveSum = categorySums.Where(c => c.Sum >= 0).Sum(c => c.Sum);

            var negativeStatistics = new List<GetStatiscicsDto>();
            var positiveStatistics = new List<GetStatiscicsDto>();

            foreach (var category in categories)
            {
                decimal categorySum = categorySums.FirstOrDefault(c => c.CategoryId == category.Id)?.Sum ?? 0.0m;

                if (categorySum == 0)
                {
                    continue;
                }

                decimal percentage;
                if (categorySum < 0)
                {
                    percentage = negativeSum != 0 ? (categorySum / negativeSum) * 100 : 0;
                }
                else
                {
                    percentage = positiveSum != 0 ? (categorySum / positiveSum) * 100 : 0;
                }

                percentage = Math.Round(percentage, 2);

                var statisticsDto = new GetStatiscicsDto
                {
                    CategoryName = category.Name,
                    Sum = categorySum,
                    Percentage = percentage,
                    CategoryId = category.Id,
                    Color = category.Color,
                };

                if (categorySum > 0)
                {
                    positiveStatistics.Add(statisticsDto);
                }
                else
                {
                    negativeStatistics.Add(statisticsDto);
                }
            }

            positiveStatistics = positiveStatistics.OrderByDescending(s => s.Sum).ToList();
            negativeStatistics = negativeStatistics.OrderBy(s => s.Sum).ToList();

            return (positiveStatistics, negativeStatistics);
        }
    }
}
