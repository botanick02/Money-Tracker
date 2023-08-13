﻿using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Interfaces
{
    public interface ICategoryRepository
    {
        public List<Category> GetCategories(Guid userId, DateTime? dateTimeTo = null);

        public Category? GetCategoryById(Guid id);

        public Category GetTransferCategory(Guid userId);

        public DefaultCategories GetDefaultCategories();
    }

    public class DefaultCategories
    {
        public List<CategoryMin> ExpenseCategories { get; set; } = new List<CategoryMin>();

        public List<CategoryMin> IncomeCategories { get; set; } = new List<CategoryMin>();
    }

    public class CategoryMin
    {
        public string Name { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }
    }
}
