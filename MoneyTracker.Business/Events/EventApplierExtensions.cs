﻿using Microsoft.Extensions.DependencyInjection;
using MoneyTracker.Business.Events.Account;
using MoneyTracker.Business.Events.Auth;
using MoneyTracker.Business.Events.Budgets;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Events.FinancialOperation;

namespace MoneyTracker.Business.Events
{
    public static class EventApplierExtensions
    {
        public static void ConfigureEventAppliers(this IServiceCollection services)
        {
            services.AddTransient<EventDispatcher>();
            services.AddTransient<IEventApplier<CategoryCreatedEvent>, CategoryCreatedEventApplier>();
            services.AddTransient<IEventApplier<ServiceCategoryCreatedEvent>, ServiceCategoryCreatedEventApplier>();
            services.AddTransient<IEventApplier<CategoryDeactivatedEvent>, CategoryDeactivatedEventApplier>();
            services.AddTransient<IEventApplier<CategoryNameUpdatedEvent>, CategoryNameUpdatedEventApplier>();
            services.AddTransient<IEventApplier<CategoryColorUpdatedEvent>, CategoryColorUpdatedEventApplier>();
            services.AddTransient<IEventApplier<CategoryIconUrlUpdatedEvent>, CategoryIconUrlUpdatedEventApplier>();

            services.AddTransient<IEventApplier<UserRegisteredEvent>, UserRegisteredEventApplier>();
            services.AddTransient<IEventApplier<GoogleUserRegisteredEvent>, GoogleUserRegisteredEventApplier>();
            services.AddTransient<IEventApplier<UserRefreshTokenSetEvent>, UserRefreshTokenSetEventApplier>();
            services.AddTransient<IEventApplier<DebitTransactionAddedEvent>, DebitTransactionAddedEventApplier>();
            services.AddTransient<IEventApplier<CreditTransactionAddedEvent>, CreditTransactionAddedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationCanceledEvent>, FinancialOperationCanceledEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationCreatedAtUpdatedEvent>, FinancialOperationCreatedAtUpdatedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationAmountUpdatedEvent>, FinancialOperationAmountUpdatedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationTitleUpdatedEvent>, FinancialOperationTitleUpdatedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationCategoryIdUpdatedEvent>, FinancialOperationCategoryIdUpdatedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationNoteUpdatedEvent>, FinancialOperationNoteUpdatedEventApplier>();
            services.AddTransient<IEventApplier<FinancialOperationAccountUpdatedEvent>, FinancialOperationAccountUpdatedEventApplier>();

            services.AddTransient<IEventApplier<BudgetCreateEvent>, BudgetCreateEventApplier>();
            services.AddTransient<IEventApplier<BudgetDeleteEvent>, BudgetDeleteEventApplier>();
            services.AddTransient<IEventApplier<BudgetEditEvent>, BudgetEditEventApplier>();

            services.AddTransient<IEventApplier<CreditAccountCreatedEvent>, CreditAccountCreatedEventApplier>();
            services.AddTransient<IEventApplier<DebitAccountCreatedEvent>, DebitAccountCreatedEventApplier>();
            services.AddTransient<IEventApplier<PersonalAccountCreatedEvent>, PersonalAccountCreatedEventApplier>();
            services.AddTransient<IEventApplier<PersonalAccountDeactivatedEvent>, PersonalAccountDeactivatedEventApplier>();
            services.AddTransient<IEventApplier<UpdatePersonalAccountEvent>, UpdatePersonalAccountEventApplier>();

        }
    }
}
