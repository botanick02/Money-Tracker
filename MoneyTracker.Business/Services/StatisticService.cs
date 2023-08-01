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

        public StatisticService(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository, IAccountRepository accountRepository)
        {
            this.transactionRepository = transactionRepository;
            this.categoryRepository = categoryRepository;
            this.accountRepository = accountRepository;

        }

        public List<GetStatiscicsDto> GetStatistics(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null)
        {
            var transactions = transactionRepository.GetUserTransactions(userId);
            var categories = categoryRepository.GetCategories(toDate ?? DateTime.Now);

           
            var negativeTransactions = transactions.Where(t => t.Amount < 0);

            decimal totalSum = transactions.Sum(t => t.Amount);
            decimal negativeSum = -negativeTransactions.Sum(t => t.Amount);

            var categorySums = negativeTransactions
                .GroupBy(t => t.CategoryId)
                .Select(group => new
                {
                    CategoryId = group.Key,
                    Sum = -group.Sum(t => t.Amount) 
                })
                .ToList();

            var statistics = new List<GetStatiscicsDto>();

            foreach (var category in categories)
            {
                decimal categorySum = categorySums.FirstOrDefault(c => c.CategoryId == category.Id)?.Sum ?? 0.0m;

               
                if (categorySum == 0)
                {
                    continue;
                }

                decimal percentage = negativeSum != 0 ? (categorySum / negativeSum) * 100 : 0;

               
                percentage = Math.Round(percentage, 2);

                statistics.Add(new GetStatiscicsDto
                {
                    CategoryName = category.Name,
                    Sum = categorySum,
                    Percentage = percentage
                });
            }

            statistics = statistics.OrderByDescending(s => s.Sum).ToList();

            return statistics;
        }



    }
}
