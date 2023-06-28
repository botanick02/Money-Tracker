using GraphQL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using MoneyTracker.App.Authentication;
using MoneyTracker.App.GraphQl;
using MoneyTracker.Business.Services;
using MoneyTracker.Business.Utilities;
using MoneyTracker.MsSQL.Repositories;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Infrastructure.EventStore;
using MoneyTracker.Business.Commands;
using MoneyTracker.Business.Commands.Category;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;
using MoneyTracker.Infrastracture.Repositories;

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
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IEventStore, EventStore>();
builder.Services.AddSingleton<ICategoryRepository, CategoryRepository>();

builder.Services.AddTransient<ICommandHandler<CreateCategoryCommand>, CreateCategoryCommandHandler>();

builder.Services.AddTransient<ICommandHandler<UpdateCategoryNameCommand>, UpdateCategoryNameCommandHandler>();
builder.Services.AddTransient<CommandDispatcher>();



builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication("CustomTokenScheme")
        .AddScheme<AuthenticationSchemeOptions, CustomTokenAuthenticationHandler>("CustomTokenScheme", options => { })
        .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = "503578281552-2tkt0e280t9rguhv8m1fs0q7q5tv2kkk.apps.googleusercontent.com";
            googleOptions.ClientSecret = "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";
        });

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
