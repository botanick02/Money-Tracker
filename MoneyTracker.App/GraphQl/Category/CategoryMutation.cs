using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types.Inputs;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;
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
                    var category = context.GetArgument<CreateCategoryInput>("Category");
                    var userId = Guid.Parse(context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                    var command = new CreateCategoryCommand(userId, category.Name, category.Type, category.IconUrl, category.Color);
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

                    var command = new DeleteCategoryCommand(Guid.Parse(id), userId);
                    await commandDispatcher.DispatchAsync(command);
                    return true;
                }).Authorize();
        }
    }
}
