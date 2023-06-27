using System;

namespace MoneyTracker.Business.Commands
{
    public class CreateTransactionCommand : ICommand
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public decimal Amount { get; set; }
        public Guid CategoryId { get; set; }
        public DateTime DateTime { get; set; }
        public Guid AccountId { get; set; }
    }
}