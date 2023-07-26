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

        public StatisticService(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository)
        {
            this.transactionRepository = transactionRepository;
            this.categoryRepository = categoryRepository;
        }

        public List<GetStatiscicsDto> GetAccountTransactions(Guid userId, DateTime? fromDate = null, DateTime? toDate = null, Guid? accountId = null)
        {
            var categories = categoryRepository.GetCategories(toDate ?? DateTime.Now); 

            var statistics = new List<GetStatiscicsDto>();

            var transactions = transactionRepository.GetAccountTransactions(userId);

         
            decimal totalSum = transactions.Sum(t => t.Amount);

            var categorySums = transactions
                .GroupBy(t => t.CategoryId)
                .Select(group => new
                {
                    CategoryId = group.Key,
                    Sum = group.Sum(t => t.Amount)
                })
                .ToList();

            foreach (var category in categories)
            {
                decimal categorySum = categorySums.FirstOrDefault(c => c.CategoryId == category.Id)?.Sum ?? 0.0m;
                decimal percentage = totalSum > 0 ? (categorySum / totalSum) * 100 : 0;

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
