using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types
{
    public class CategoryInputType : InputObjectGraphType<Business.Entities.Category>
    {
        public CategoryInputType()
        {
            Field(c => c.Id, nullable: true);
            Field(c => c.Name);
            Field(c => c.Type);
            Field(c => c.IconUrl);
            Field(c => c.Color);
        }
    }
}
