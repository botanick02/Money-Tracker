using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace MoneyTracker.Api.GraphQl
{
    public class MoneyTrackerSchema : Schema
    {
        public MoneyTrackerSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
            //Mutation = serviceProvider.GetRequiredService<RootMutation>();
        }
    }
}
