using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using GraphQL.Upload.AspNetCore;
using System.Diagnostics;

namespace MoneyTracker.App.GraphQl.DataImport
{
    public class DataImportMutation : ObjectGraphType
    {
        public DataImportMutation()
        {
            Field<bool>("ImportMonobankXls")
               .Argument<UploadGraphType>("File")
               .ResolveAsync(async context =>
               {
                   var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                   var file = context.GetArgument<IFormFile>("File");
                   Debug.WriteLine(file);
                   return true;
               }).Authorize();
        }
    }
}
