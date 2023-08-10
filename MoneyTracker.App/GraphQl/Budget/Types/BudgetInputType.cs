using GraphQL.Types;

namespace MoneyTracker.App.GraphQl.Budget.Types
{
    public class BudgetInputType : InputObjectGraphType<Business.Entities.Budget>
    {
        public BudgetInputType()
        {
            Field(x => x.Id, nullable: true);
            Field(x => x.Title, nullable: true);
            Field(x => x.Limit);
            Field(x => x.CategoryId);
        }
    }
}
