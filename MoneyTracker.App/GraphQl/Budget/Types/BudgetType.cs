﻿using GraphQL.Types;
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
            Field(x => x.Title);
            Field(x => x.Categories);
            Field(x => x.Spent);
            Field(x => x.TimeScope);
        }
    }
}
