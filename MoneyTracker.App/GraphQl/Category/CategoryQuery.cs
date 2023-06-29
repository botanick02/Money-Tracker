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
                .Argument<StringGraphType>("CategoryId")
                .Argument<IntGraphType>("Version")
                .Resolve(context =>
                {
                    var id = context.GetArgument<string>("CategoryId");

                    var version = context.GetArgument<int?>("Version");

                    return categoryRepository.GetCategoryById(Guid.Parse(id), version);
                });
        }
    }
}
