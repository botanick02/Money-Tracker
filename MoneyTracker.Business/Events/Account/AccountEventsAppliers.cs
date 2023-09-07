using MoneyTracker.Business.ReadStoreModel;
using System.Xml.Linq;

namespace MoneyTracker.Business.Events.Account
{
    public class DebitAccountCreatedEventApplier : IEventApplier<DebitAccountCreatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, DebitAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newDebitAccount = new Entities.Account()
            {
                Id = @event.AccountId,
                UserId = @event.UserId,
                Currency = @event.Currency,
                Type = Entities.AccountType.Debit
            };

            updatedModel.Accounts = updatedModel.Accounts.Append(newDebitAccount);

            return updatedModel;
        }
    }

    public class CreditAccountCreatedEventApplier : IEventApplier<CreditAccountCreatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, CreditAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newDebitAccount = new Entities.Account()
            {
                Id = @event.AccountId,
                UserId = @event.UserId,
                Currency = @event.Currency,
                Type = Entities.AccountType.Credit
            };

            updatedModel.Accounts = updatedModel.Accounts.Append(newDebitAccount);

            return updatedModel;
        }
    }

    public class PersonalAccountCreatedEventApplier : IEventApplier<PersonalAccountCreatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, PersonalAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newPersonalAccount = new Entities.Account()
            {
                Id = @event.AccountId,
                UserId = @event.UserId,
                Currency = @event.Currency,
                Name = @event.Name,
                IsActive = @event.IsActive,
                Type = Entities.AccountType.Personal
            };

            updatedModel.Accounts = updatedModel.Accounts.Append(newPersonalAccount);

            return updatedModel;
        }
    }
    public class PersonalAccountDeactivatedEventApplier : IEventApplier<PersonalAccountDeactivatedEvent>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentmodel, PersonalAccountDeactivatedEvent @event)
        {
            var updatedModel = currentmodel;

            var accountToUpdate = updatedModel.Accounts.FirstOrDefault(account => account.Id == @event.AccountId);
            if (accountToUpdate != null)
            {
                accountToUpdate.IsActive = false;
            }

            return updatedModel;
        }
    }

    public class UpdatePersonalAccountCommandApplier : IEventApplier<UpdatePersonalAccountCommand>
    {
        public async Task<ReadModel> ApplyAsync(ReadModel currentModel, UpdatePersonalAccountCommand @event)
        {
           
            var updatedModel = currentModel;

            var accountToUpdate = updatedModel.Accounts.FirstOrDefault(account => account.Id == @event.AccountId);

            if (accountToUpdate != null)
            {
                accountToUpdate.Name = @event.Name;
                accountToUpdate.Currency = @event.Currency;
              
            }

            return updatedModel;
        }
    }
}


