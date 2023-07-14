namespace MoneyTracker.Business.Commands.Category
{
    public class CreateCategoryCommand
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }

    public class UpdateCategoryNameCommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class DeactivateCategoryCommand
    {
        public Guid Id { get; set; }
    }
}