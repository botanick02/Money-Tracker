using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types.Inputs;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Entities;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryMutation : ObjectGraphType
    {
        public CategoryMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("CreateCategory")
                .Argument<CreateCategoryInputType>("Category")
                .ResolveAsync(async context =>
                {
                    var input = context.GetArgument<CreateCategoryInput>("Category");

                    bool isValid = ModelValidationHelper.ValidateModel(input, out List<ValidationResult> results);

                    if (!isValid)
                    {
                        foreach (var result in results)
                        {
                            var exception = new ExecutionError($"{result.MemberNames.First()}: {result.ErrorMessage!}");
                            exception.Code = "VALIDATION_ERROR";
                            context.Errors.Add(exception);
                        }
                        return false;
                    }

                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var command = new CreateCategoryCommand(userId, input.Name, Enum.Parse<TransactionTypes>(input.Type), input.IconUrl, input.Color);
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();


            Field<bool>("EditCategory")
                .Argument<UpdateCategoryInputType>("Category")
                .ResolveAsync(async context =>
                {
                    var category = context.GetArgument<UpdateCategoryInput>("Category");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var command = new UpdateCategoryCommand(Guid.Parse(category.Id), userId, category.Name, category.IconUrl, category.Color);
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();


            Field<bool>("DeleteCategory")
                .Argument<StringGraphType>("id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<string>("id");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var command = new DeactivateCategoryCommand(Guid.Parse(id), userId);
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();
        }
    }
}
