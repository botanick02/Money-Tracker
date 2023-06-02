using GraphQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MoneyTracker.API.GraphQl;
using MoneyTracker.BLL;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterBLLDependencies();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVk"))
    };
});
builder.Services.AddAuthorization();


builder.Services.AddGraphQL(b => b
    .AddSchema<MoneyTrackerSchema>()
    .AddGraphTypes(typeof(MoneyTrackerSchema).Assembly)
    .AddAutoClrMappings()
    .AddSystemTextJson()
    .AddAuthorizationRule());

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();


app.UseGraphQLAltair();
app.UseGraphQL("/graphql");

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}



app.MapGet("/", () => "Hello World!");

app.Run();
