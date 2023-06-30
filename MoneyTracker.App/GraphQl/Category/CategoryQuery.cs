using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(ICategoryRepository categoryRepository) {
            Field<ListGraphType<CategoryType>>("GetCategories")
                .Resolve(context =>
                {
                    return categoryRepository.GetCategories();
                });
        }
    }
}
