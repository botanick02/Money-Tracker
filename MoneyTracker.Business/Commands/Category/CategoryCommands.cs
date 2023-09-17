
using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Commands.Category
{
    public record CreateCategoryCommand(Guid UserId, string Name, TransactionTypes Type, string IconUrl, string Color);

    public record UpdateCategoryCommand(Guid CategoryId, Guid UserId, string Name, string IconUrl, string Color);

    public record DeactivateCategoryCommand(Guid CategoryId, Guid userId);
}