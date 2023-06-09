using GraphQL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using MoneyTracker.App.Authentication;
using MoneyTracker.App.GraphQl;
using MoneyTracker.App.Helpers;
using MoneyTracker.Business.IRepositories;
using MoneyTracker.Business.Services;
using MoneyTracker.Business.Utilities;
using MoneyTracker.MsSQL.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", builder =>
    {
        builder.AllowAnyHeader()
               .WithMethods("POST", "OPTIONS")
               .WithOrigins("http://localhost:3000")
               .AllowCredentials();
    });
});

builder.Services.Configure<AuthTokenSettings>(builder.Configuration.GetSection("AuthTokenSettings"));
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddTransient<AuthService>();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<PasswordHashService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication("CustomTokenScheme")
        .AddScheme<AuthenticationSchemeOptions, CustomTokenAuthenticationHandler>("CustomTokenScheme", options => { });

builder.Services.AddAuthorization();

builder.Services.AddGraphQL(b => b
    .AddSchema<MoneyTrackerSchema>()
    .AddGraphTypes(typeof(MoneyTrackerSchema).Assembly)
    .AddAutoClrMappings()
    .AddSystemTextJson()
    .AddAuthorizationRule());

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "client/build";
});


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("DefaultPolicy");
app.UseGraphQLAltair();
app.UseGraphQL("/graphql");

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}


app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client";
    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});


//app.MapGet("/", () => "Hello World!");

app.Run();
