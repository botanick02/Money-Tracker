using GraphQL;
using MoneyTracker.API.GraphQl;
using MoneyTracker.BLL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterBLLDependencies();

builder.Services.AddGraphQL(b => b
    .AddSchema<MoneyTrackerSchema>()
    .AddGraphTypes(typeof(MoneyTrackerSchema).Assembly)
    .AddAutoClrMappings()
    .AddSystemTextJson());

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseGraphQLAltair();

app.UseGraphQL("/graphql");

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseAuthorization();


app.MapGet("/", () => "Hello World!");

app.Run();
