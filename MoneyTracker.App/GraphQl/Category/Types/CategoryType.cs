using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types
{
    public class CategoryType : ObjectGraphType<Business.Entities.Category>
    {
        public CategoryType()
        {
            Field(c => c.Id);
            Field(c => c.Name);
            Field(c => c.Type);
            Field(c => c.IconUrl);
            Field(c => c.Color);
        }
    }
}
