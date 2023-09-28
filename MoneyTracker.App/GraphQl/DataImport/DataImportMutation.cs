using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using GraphQL.Upload.AspNetCore;
using System.Diagnostics;
using MoneyTracker.Business.Services;

namespace MoneyTracker.App.GraphQl.DataImport
{
    public class DataImportMutation : ObjectGraphType
    {
        public DataImportMutation(ImportDataService importService)
        {
            Field<bool>("ImportMonobankXls")
               .Argument<StringGraphType>("AccountId")
               .Argument<StringGraphType>("SavingsAccountName")
               .Argument<StringGraphType>("SavingsAccountId")
               .Argument<UploadGraphType>("File")
               .ResolveAsync(async context =>
               {
                   var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                   var file = context.GetArgument<IFormFile>("File");
                   var accountId = Guid.Parse(context.GetArgument<string>("AccountId"));
                   var savingsAccountName = context.GetArgument<string?>("SavingsAccountName");
                   var savingsAccountId = context.GetArgument<string?>("SavingsAccountId");

                   try
                   {
                       await importService.ImportTransactions(file, userId, accountId, savingsAccountName, savingsAccountId != null ? Guid.Parse(savingsAccountId) : null);
                   }
                   catch (SavingsAccountNotProvided)
                   {
                       var exception = new ExecutionError($"");
                       exception.Code = "SAVINGS_ACCOUNT_INFO_REQUIRED";
                       context.Errors.Add(exception);
                   }
                   
                   return true;
               }).Authorize();
        }
    }
}
