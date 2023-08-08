using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.FinancialOperation;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business.Commands.FinancialOperation
{
    public class AddDebitOperationCommandHandler : ICommandHandler<AddDebitOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly IAccountRepository accountRepository;

        public AddDebitOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
        }

        public async Task<bool> HandleAsync(AddDebitOperationCommand command)
        {
            var eventsToAppend = new List<Event>();

            var transactionId = Guid.NewGuid();

            var usersDebitAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Debit).FirstOrDefault();

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount : command.Amount
            ));

            eventsToAppend.Add(new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: usersDebitAccount.Id,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }

    public class AddCreditOperationCommandHandler : ICommandHandler<AddCreditOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly IAccountRepository accountRepository;

        public AddCreditOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
        }

        public async Task<bool> HandleAsync(AddCreditOperationCommand command)
        {
            var transactionId = Guid.NewGuid();

            var usersCreditAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Credit).FirstOrDefault();


            var eventsToAppend = new List<Event>();

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: usersCreditAccount.Id,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            eventsToAppend.Add(new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.FromAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }

    public class AddTransferOperationCommandHandler : ICommandHandler<AddTransferOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly IAccountRepository accountRepository;

        public AddTransferOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
        }

        public async Task<bool> HandleAsync(AddTransferOperationCommand command)
        {
            var eventsToAppend = new List<Event>();

            var transactionId = Guid.NewGuid();

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            eventsToAppend.Add(new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: DateTime.UtcNow,
                AccountId: command.FromAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }

    public class CancelFinancialOperationCommandHandler : ICommandHandler<CancelFinancialOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ITransactionRepository transactionRepository;


        public CancelFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
        {
            this.eventStore = eventStore;
            this.transactionRepository = transactionRepository;
        }

        public async Task<bool> HandleAsync(CancelFinancialOperationCommand command)
        {
            var transactions = transactionRepository.GetTransactionsByOperationId(command.TransactionId);
            if (transactions.Count < 2)
            {
                return false;
            }

            var cancelEvent = new FinancialOperationCanceledEvent
            (
                OperationId: command.TransactionId
            );

            await eventStore.AppendEventAsync(cancelEvent);

            return true;
        }
    }

    public class UpdateFinancialOperationCommandHandler : ICommandHandler<UpdateFinancialOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ITransactionRepository transactionRepository;


        public UpdateFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository)
        {
            this.eventStore = eventStore;
            this.transactionRepository = transactionRepository;
        }

        public async Task<bool> HandleAsync(UpdateFinancialOperationCommand command)
        {
            var existingTransaction = transactionRepository.GetTransactionsByOperationId(command.OperationId)[0];

            var eventsToAppend = new List<Event>();

            if (Math.Abs(command.Amount) != Math.Abs(existingTransaction.Amount))
            {
                eventsToAppend.Add(new FinancialOperationAmountUpdatedEvent(command.OperationId, command.Amount));
            }

            if (command.Title != existingTransaction.Title)
            {
                eventsToAppend.Add(new FinancialOperationTitleUpdatedEvent(command.OperationId, command.Title));
            }

            if (command.CategoryId != existingTransaction.CategoryId)
            {
                eventsToAppend.Add(new FinancialOperationCategoryIdUpdatedEvent(command.OperationId, command.CategoryId));
            }

            if (command.Note != existingTransaction.Note)
            {
                eventsToAppend.Add(new FinancialOperationNoteUpdatedEvent(command.OperationId, command.Note));
            }

            if (command.CreatedAt != existingTransaction.CreatedAt)
            {
                eventsToAppend.Add(new FinancialOperationCreatedAtUpdatedEvent(command.OperationId, command.CreatedAt));
            }

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }
}
