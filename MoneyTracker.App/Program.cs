using GraphQL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using MoneyTracker.App.Authentication;
using MoneyTracker.App.GraphQl;
using MoneyTracker.Business.Services;
using MoneyTracker.Business.Utilities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Commands;
using MoneyTracker.Infrastructure.EventStore;
using MoneyTracker.DataAccess;
using MoneyTracker.DataAccess.MsSQL;
using MoneyTracker.Business.ReadStoreModel;
using MoneyTracker.DataAccess.Repositories;
using MoneyTracker.App.Helpers;

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

builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<IDBInitializer, MsSQLDBInitializer>();
builder.Services.AddTransient<IEventStoreRepository, EventStoreMsSqlRepository>();

builder.Services.AddSingleton<HeaderTimeTravelProviderParser>();

builder.Services.Configure<AuthTokenSettings>(builder.Configuration.GetSection("AuthTokenSettings"));

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddTransient<AuthService>();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<PasswordHashService>();

builder.Services.AddTransient<AccountService>();
builder.Services.AddTransient<TransactionService>();
builder.Services.AddTransient<BudgetService>();
builder.Services.AddTransient<StatisticService>();

builder.Services.AddTransient<IEventStore, EventStore>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<ITransactionRepository, TransactionRepository>();

builder.Services.AddTransient<IBudgetRepository, BudgetRepository>();
builder.Services.AddTransient<IAccountRepository, AccountRepository>();
builder.Services.AddTransient<IAccountRepository, AccountRepository>();
builder.Services.AddTransient<ICurrencyRepository, CurrencyRepository>();

builder.Services.ConfigureCommandHandlers();
builder.Services.ConfigureEventAppliers();

builder.Services.AddTransient<IReadModelExtensions, ReadModelExtensions>();

builder.Services.AddSingleton<CurrentReadModel>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication("CustomTokenScheme")
        .AddScheme<AuthenticationSchemeOptions, CustomTokenAuthenticationHandler>("CustomTokenScheme", options => { })
        .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = "503578281552-2tkt0e280t9rguhv8m1fs0q7q5tv2kkk.apps.googleusercontent.com";
            googleOptions.ClientSecret = "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";
        });

builder.Services.AddAuthorization();

builder.Services.AddGraphQLUpload();

builder.Services
    .AddGraphQL(b => b
    .AddSchema<MoneyTrackerSchema>()
    .AddGraphTypes(typeof(MoneyTrackerSchema).Assembly)
    .AddAutoClrMappings()
    .AddSystemTextJson()
    .AddAuthorizationRule()
    .AddErrorInfoProvider(options => options.ExposeExceptionStackTrace = true)
    );

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "client/public";
});
var app = builder.Build();

var dbInitializer = app.Services.GetRequiredService<IDBInitializer>();
dbInitializer.InitializeDatabase();

var currentReadModel = app.Services.GetRequiredService<CurrentReadModel>();
var readModelExtensions = app.Services.GetRequiredService<IReadModelExtensions>();
currentReadModel.CurrentModel = readModelExtensions.GetReadModel(DateTime.Now);

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("DefaultPolicy");
app.UseGraphQLUpload<MoneyTrackerSchema>("/graphql");
app.UseGraphQL<MoneyTrackerSchema>("/graphql");
app.UseGraphQLAltair();

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


app.Run();