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
               .WithOrigins("https://money-tracker-production-7a87.up.railway.app")
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
            googleOptions.ClientId = "1018492247415-kte528se113fqqkacaaq9tk0um1c1s7a.apps.googleusercontent.com";
            googleOptions.ClientSecret = "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";
        });

builder.Services.AddAuthorization();

builder.Services.AddGraphQL(b => b
    .AddSchema<MoneyTrackerSchema>()
    .AddGraphTypes(typeof(MoneyTrackerSchema).Assembly)
    .AddAutoClrMappings()
    .AddSystemTextJson()
    .AddAuthorizationRule()
    .AddErrorInfoProvider(options => options.ExposeExceptionStackTrace = true)
    );


var app = builder.Build();

var dbInitializer = app.Services.GetRequiredService<IDBInitializer>();
dbInitializer.InitializeDatabase();

var currentReadModel = app.Services.GetRequiredService<CurrentReadModel>();
var readModelExtensions = app.Services.GetRequiredService<IReadModelExtensions>();
currentReadModel.CurrentModel = readModelExtensions.GetReadModel(DateTime.Now);

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("DefaultPolicy");
app.UseGraphQLAltair();
app.UseGraphQL("/graphql");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot";
});


app.Run();