using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class CategoryDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public TransactionTypes Type { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }

        public bool IsService { get; set; } = false;

        public bool IsActive { get; set; } = true;
    }
}
