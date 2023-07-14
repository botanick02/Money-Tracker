using GraphQL;
using GraphQL.Types;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;

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
                        Name: "testCat",
                        Type: "income"
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
        }
    }
}
