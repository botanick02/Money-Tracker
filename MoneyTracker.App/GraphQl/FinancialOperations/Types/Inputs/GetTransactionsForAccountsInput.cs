﻿using MoneyTracker.App.Helpers;

namespace MoneyTracker.App.GraphQl.FinancialOperations.Types.Inputs
{
    public class GetTransactionsForAccountsInput
    {
        [GuidValidationAttribute(ErrorMessage = "FromAccountId is invalid")]

        public Guid? AccountId { get; set; }
    }
}