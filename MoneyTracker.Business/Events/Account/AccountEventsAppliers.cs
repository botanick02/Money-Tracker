using MoneyTracker.Business.ReadStoreModel;

namespace MoneyTracker.Business.Events.Account
{
    public class DebitAccountCreatedEventApplier : IEventApplier<DebitAccountCreatedEvent>
    {
        public ReadModel Apply(ReadModel currentModel, DebitAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newDebitAccount = new Entities.Account()
            {
                Id = @event.Id,
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
        public ReadModel Apply(ReadModel currentModel, CreditAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newDebitAccount = new Entities.Account()
            {
                Id = @event.Id,
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
        public ReadModel Apply(ReadModel currentModel, PersonalAccountCreatedEvent @event)
        {
            var updatedModel = currentModel;

            var newDebitAccount = new Entities.Account()
            {
                Id = @event.Id,
                UserId = @event.UserId,
                Currency = @event.Currency,
                Name = @event.Name,
                Type = Entities.AccountType.Personal
            };

            updatedModel.Accounts = updatedModel.Accounts.Append(newDebitAccount);

            return updatedModel;
        }
    }
}
