namespace MoneyTracker.Business.Commands.Category
{
    public record CreateCategoryCommand(string Name, string Type);

    public record UpdateCategoryNameCommand(Guid Id, string Name);

    public record DeactivateCategoryCommand(Guid Id);
}