using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.Category.Types
{
    public class CategorykType : ObjectGraphType<CategoryDto>
    {
        public CategorykType()
        {
            Field(c => c.Id);

            Field(c => c.Name);

            Field(c => c.Type);

            Field(c => c.IconUrl);

            Field(c => c.Color);

            Field(c => c.IsService);

            Field(c => c.IsActive);
        }
    }
}
