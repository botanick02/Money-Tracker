var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseGraphQLAltair();

app.UseGraphQL("/graphql");

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapGet("/", () => "Hello World!");

app.Run();
