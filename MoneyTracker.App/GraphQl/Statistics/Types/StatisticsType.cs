using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.FinancialOperation.Types
{
    public class StatiscicType : ObjectGraphType<GetStatiscicsDto>
    {
        public StatiscicType()
        {
            Field(t => t.CategoryName, nullable: true).Description("The name of the category.");
            Field(t => t.Sum).Description("The sum of transactions for the category.");
            Field(t => t.Percentage).Description("The percentage of total transactions for the category.");
        }
    }
}
