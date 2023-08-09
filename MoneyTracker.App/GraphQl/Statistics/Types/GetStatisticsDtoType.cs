using GraphQL.Types;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types
{
    public class GetStatisticsDtoType : ObjectGraphType<GetStatiscicsDto>
    {
        public GetStatisticsDtoType()
        {
            Field(g => g.CategoryName);

            Field(g => g.CategoryId);

            Field(g => g.Sum);

            Field(g => g.Percentage);
           
        }
    }
}
