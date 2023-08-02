
namespace MoneyTracker.Business.Commands.Category
{
    public record CreateCategoryCommand(Entities.Category category);

    public record UpdateCategoryNameCommand(Guid Id, string Name);

    public record DeleteCategoryCommand(string Id);
}