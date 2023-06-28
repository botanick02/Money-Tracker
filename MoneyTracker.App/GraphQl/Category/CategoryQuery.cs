using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Interfaces;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(ICategoryRepository categoryRepository) {
            Field<CategoryType>("GetCategory")
                .Argument<string>("CategoryId")
                .Resolve(context =>
                {
                    var id = context.GetArgument<string>("CategoryId");

                    return categoryRepository.GetCategoryById(Guid.Parse(id));
                });
        }
    }
}
