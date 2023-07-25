using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.Budget.Types
{
    public class BudgetType : ObjectGraphType<BudgetDto>
    {
        public BudgetType()
        {
            Field(x => x.Id);
            Field(x => x.Limit);
            Field(x => x.IsActive);
            Field(x => x.EndDate, nullable: true);
            Field(x => x.StartDate, nullable: true);
            Field(x => x.Category, type: typeof(CategoryType), nullable: false);
            Field(x => x.Spent);
        }
    }
}
