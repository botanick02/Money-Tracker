using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class CreateCategoryInputType : InputObjectGraphType<CreateCategoryInput>
    {
        public CreateCategoryInputType()
        {
            Field(c => c.Name);
            Field(c => c.Type);
            Field(c => c.IconUrl);
            Field(c => c.Color);
        }
    }
}
