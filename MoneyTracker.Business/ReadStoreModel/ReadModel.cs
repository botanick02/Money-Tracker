﻿using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.ReadStoreModel
{
    public class ReadModel
    {
        public List<User> Users { get; set; } = new List<User>();

        public List<Transaction> Transactions { get; set; }  = new List<Transaction>();

        public List<Category> Categories { get; set; } = new List<Category>();
    }
}
