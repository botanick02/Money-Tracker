using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Category.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Budget;
using MoneyTracker.Business.Commands.Category;
using MoneyTracker.Business.Entities;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryMutation : ObjectGraphType
    {
        public CategoryMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("CreateCategoryTest")
                .Resolve(context =>
                {
                    var command = new CreateCategoryCommand
                    (
                        new Business.Entities.Category()
                        {
                            Name = "Test Cat",
                            Type = "Expence",
                            IconUrl = "./media/icons/basket.svg",
                            Color = "#74fdd8"
                        }
                    );

                    commandDispatcher.Dispatch(command);
                    return true;
                });


            Field<bool>("RenameCategoryTest")
                .Argument<string>("CategoryId")
                .Argument<string>("Name")
                .Resolve(context =>
                {
                    var id = context.GetArgument<string>("CategoryId");
                    var name = context.GetArgument<string>("Name");

                    if (!Guid.TryParse(id, out var categoryGuidId))
                    {
                        var exception = new ExecutionError($"CategoryId: Category Id is invalid");
                        exception.Code = "VALIDATION_ERROR";
                        context.Errors.Add(exception);
                        return false;
                    }

                    var command = new UpdateCategoryNameCommand
                    (
                        Id: categoryGuidId,
                        Name: name
                    );

                    try
                    {
                        commandDispatcher.Dispatch(command);
                    }
                    catch (CategoryNotFoundException ex)
                    {
                        var exception = new ExecutionError($"CategoryId: Category Id is invalid");
                        exception.Code = "VALIDATION_ERROR";
                        context.Errors.Add(exception);
                        return false;
                    }
                    return true;
                });




            Field<bool>("CreateCategory")
                .Argument<CategoryInputType>("Category")
                .Resolve(context =>
                {
                    var category = context.GetArgument<Business.Entities.Category>("Category");
                    var command = new CreateCategoryCommand(category);
                    commandDispatcher.Dispatch(command);
                    return true;
                });


            Field<bool>("DeleteCategory")
                .Argument<StringGraphType>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<string>("id");
                    var command = new DeleteCategoryCommand(id);
                    commandDispatcher.Dispatch(command);
                    return true;
                });
        }
    }
}
