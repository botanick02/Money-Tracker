using GraphQL.Types;
using GraphQL;
using GraphQL.Resolvers;
using System.Diagnostics.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.API.GraphQl.Types
{
    public class CustomFieldResponse<TDataType, TData> : ObjectGraphType<CustomFieldResponse<TData>>
        where TDataType : IObjectGraphType
    {
        public CustomFieldResponse()
        {
            Field(name: "Data", type: typeof(TDataType), resolve: context => context.Source.Data);

            Field(r => r.Errors);
        }
    }

    public class CustomFieldResponse<TData>
    {
        public TData? Data { get; set; }

        public List<GraphQLError> Errors { get; set; } = new List<GraphQLError>();
    }

    public class GraphQLErrorType : ObjectGraphType<GraphQLError>
    {
        public GraphQLErrorType()
        {
            Field(e => e.Extensions);
        }
    }

    public class GraphQLError
    {
        public GraphQLErrorExtensions? Extensions { get; set; }
    }

    public class GraphQLErrorExtensions
    {
        public string Code { get; set; }

        public GraphQLErrorExtensions(string code)
        {
            Code = code;
        }
    }
}
