using GraphQL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using MoneyTracker.App.Authentication;
using MoneyTracker.App.GraphQl;
using MoneyTracker.Business.Services;
using MoneyTracker.Business.Utilities;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Infrastructure.EventStore;
using MoneyTracker.Business.Commands;
using static MoneyTracker.Business.Commands.Category.CategoryCommands;
using MoneyTracker.Infrastracture;
using MoneyTracker.Business.EventAppliers;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;
using static MoneyTracker.Business.EventAppliers.Category.CategoryEventAppliers;
using static MoneyTracker.Business.Events.Auth.AuthEvents;
using static MoneyTracker.Business.EventAppliers.Auth.AuthEventAppliers;
using static MoneyTracker.Business.Commands.Auth.AuthCommands;
using static MoneyTracker.Business.Commands.Auth.AuthCommandsHandler;
using MoneyTracker.Business.ReadStoreModel;
using MoneyTracker.Infrastracture.MsSQL;
using static MoneyTracker.Business.Commands.Category.CategoryCommandsHandler;
using static MoneyTracker.Business.Commands.FinancialOperation.FinancialOperationCommands;
using static MoneyTracker.Business.Commands.FinancialOperation.FinancialOperationCommandsHandler;
using static MoneyTracker.Business.Events.FinancialOperation.FinancialOperationEvents;
using static MoneyTracker.Business.EventAppliers.FinancialOperation.FinancialOperationEventAppliers;

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
builder.Services.AddTransient<IDBInitializer, MsSQLDBInitializer>();
builder.Services.AddTransient<IEventStoreRepository, EventStoreMsSqlRepository>();

builder.Services.Configure<AuthTokenSettings>(builder.Configuration.GetSection("AuthTokenSettings"));

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddTransient<AuthService>();
builder.Services.AddTransient<TokenService>();
builder.Services.AddTransient<PasswordHashService>();


builder.Services.AddTransient<IEventStore, EventStore>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<ITransactionRepository, TransactionRepository>();

builder.Services.AddTransient<ICommandHandler<CreateCategoryCommand>, CreateCategoryCommandHandler>();
builder.Services.AddTransient<ICommandHandler<UpdateCategoryNameCommand>, UpdateCategoryNameCommandHandler>();

builder.Services.AddTransient<ICommandHandler<RegisterUserCommand>, RegisterUserCommandHandler>();
builder.Services.AddTransient<ICommandHandler<RegisterGoogleUserCommand>, RegisterGoogleUserCommandHandler>();
builder.Services.AddTransient<ICommandHandler<SetUserRefreshTokenCommand>, SetUserRefreshTokenCommandHandler>();

builder.Services.AddTransient<ICommandHandler<AddFinancialOperation>, AddFinancialOperationCommandHandler>();
builder.Services.AddTransient<ICommandHandler<CancelFinancialOperation>, CancelFinancialOperationCommandHandler>();

builder.Services.AddTransient<CommandDispatcher>();
builder.Services.AddTransient<EventDispatcher>();

builder.Services.AddSingleton<CurrentReadModel>();

builder.Services.AddTransient<IEventApplier<CategoryCreatedEvent>, CategoryCreatedEventApplier>();
builder.Services.AddTransient<IEventApplier<CategoryNameUpdatedEvent>, CategoryNameUpdatedEventApplier>();

builder.Services.AddTransient<IEventApplier<UserRegisteredEvent>, UserRegisteredEventApplier>();
builder.Services.AddTransient<IEventApplier<GoogleUserRegisteredEvent>, GoogleUserRegisteredEventApplier>();
builder.Services.AddTransient<IEventApplier<UserRefreshTokenSetEvent>, UserRefreshTokenSetEventApplier>();

builder.Services.AddTransient<IEventApplier<DebitTransactionAddedEvent>, DebitTransactionAddedEventApplier>();
builder.Services.AddTransient<IEventApplier<CreditTransactionAddedEvent>, CreditTransactionAddedEventApplier>();
builder.Services.AddTransient<IEventApplier<FinancialOperationCanceled>, FinancialOperationCanceledEventApplier>();

builder.Services.AddTransient<ReadModelExtensions>();


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

var dbInitializer = app.Services.GetRequiredService<IDBInitializer>();
dbInitializer.InitializeDatabase();

var currentReadModel = app.Services.GetRequiredService<CurrentReadModel>();
var readModelExtensions = app.Services.GetRequiredService<ReadModelExtensions>();
currentReadModel.CurrentModel = readModelExtensions.GetReadModel(DateTime.Now);

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
