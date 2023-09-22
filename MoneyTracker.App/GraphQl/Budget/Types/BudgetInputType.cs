using GraphQL.Types;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;
using System.Collections.Generic;

namespace MoneyTracker.App.GraphQl.Budget.Types
{

    public class BudgetInputType : InputObjectGraphType<BudgetInputDto>
    {
        public BudgetInputType()
        {
            Field(x => x.Id, nullable: true);
            Field(x => x.Title);
            Field(x => x.Limit);
            Field(x => x.CategoryId);
            Field(x => x.TimeScope);
        }
    }
}
