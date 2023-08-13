using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class UpdateCategoryInputType : InputObjectGraphType<UpdateCategoryInput>
    {
        public UpdateCategoryInputType()
        {
            Field(u => u.Id);
            Field(u => u.Name);
            Field(u => u.Type);
            Field(u => u.Color);
            Field(u => u.IconUrl);
        }
    }
}
