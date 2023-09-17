namespace MoneyTracker.Business.Entities
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid? UserId { get; set; }

        public string Name { get; set; }

        public TransactionTypes Type { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }

        public bool IsService { get; set; } = false;

        public bool IsActive { get; set; } = true;
    }

    public enum TransactionTypes
    {
        Income,
        Expense,
        DoubleSided
    }

    public enum ServiceCategories
    {
        Transfer,
        Gone,
        Comission
    }
}
