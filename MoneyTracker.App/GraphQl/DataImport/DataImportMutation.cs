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
               .Argument<UploadGraphType>("File")
               .ResolveAsync(async context =>
               {
                   var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                   var file = context.GetArgument<IFormFile>("File");
                   importService.ImportTransactions(file, userId);
                   return true;
               }).Authorize();
        }
    }
}
