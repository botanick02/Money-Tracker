using GraphQL.Types;

namespace MoneyTracker.API.GraphQl
{
    public class MoneyTrackerSchema : Schema
    {
        public MoneyTrackerSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
            Mutation = serviceProvider.GetRequiredService<RootMutation>();
        }
    }
}
