using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Services;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(IServiceProvider serviceProvider) {
            Field<ListGraphType<CategorykType>>("GetCategories")
                .Argument<DateTimeGraphType>("DateTimeTo")
                .Resolve(context =>
                {
                    var dateTimeTo = context.GetArgument<DateTime?>("DateTimeTo");

                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var categoryService = serviceProvider.GetRequiredService<CategoryService>();

                    return categoryService.GetCategories(userId, dateTimeTo);
                }).Authorize();
        }
    }
}
