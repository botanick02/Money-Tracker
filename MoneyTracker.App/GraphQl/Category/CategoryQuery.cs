using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Interfaces;
using System;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(ICategoryRepository categoryRepository) {
            Field<ListGraphType<CategoryType>>("GetCategories")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");
                    return categoryRepository.GetCategories(dateTimeTo);
                });
        }
    }
}
