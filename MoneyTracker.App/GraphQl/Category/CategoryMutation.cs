using GraphQL;
using GraphQL.Types;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.Business.Commands;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;

namespace MoneyTracker.App.GraphQl.Category
{
    public class CategoryMutation : ObjectGraphType
    {
        public CategoryMutation(CommandDispatcher commandDispatcher)
        {
            Field<bool>("CreateCategoryTest")
                .Resolve(context =>
                {
                    var command = new CreateCategoryCommand()
                    {
                        Name = "testCat",
                        Type = "Income",
                    };

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

                    var command = new UpdateCategoryNameCommand()
                    {
                        Id = id,
                        Name = name,
                    };

                    commandDispatcher.Dispatch(command);
                    return true;
                });
        }
    }
}
