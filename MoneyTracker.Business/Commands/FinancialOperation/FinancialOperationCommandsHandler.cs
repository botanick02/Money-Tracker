using MoneyTracker.Business.Entities;
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

        public bool Handle(AddDebitOperationCommand command)
        {
            var transactionId = Guid.NewGuid();

            var usersDebitAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Debit).FirstOrDefault();

            var currentTime = DateTime.UtcNow;

            var debitTransactionEvent = new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount : command.Amount
            );

            var creditTransactionEvent = new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: usersDebitAccount.Id,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            eventStore.AppendEvent(debitTransactionEvent); //TODO: implement simultaneous event append with sql transactions
            eventStore.AppendEvent(creditTransactionEvent);

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

        public bool Handle(AddCreditOperationCommand command)
        {
            var transactionId = Guid.NewGuid();

            var usersCreditAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Credit).FirstOrDefault();

            var currentTime = DateTime.UtcNow;

            var debitTransactionEvent = new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                AccountId: usersCreditAccount.Id,
                CreatedAt: command.CreatedAt ?? currentTime,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            var creditTransactionEvent = new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: command.FromAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            eventStore.AppendEvent(debitTransactionEvent); //TODO: implement simultaneous event append with sql transactions
            eventStore.AppendEvent(creditTransactionEvent);

            return true;
        }
    }

    public class AddTransferOperationCommandHandler : ICommandHandler<AddTransferOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ICategoryRepository categoryRepository;

        public AddTransferOperationCommandHandler(IEventStore eventStore, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.categoryRepository = categoryRepository;
        }

        public bool Handle(AddTransferOperationCommand command)
        {
            var transactionId = Guid.NewGuid();

            var currentTime = DateTime.UtcNow;

            var transferCategoryId = categoryRepository.GetTransferCategory().Id;

            var debitTransactionEvent = new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: transferCategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            var creditTransactionEvent = new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: transferCategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: command.FromAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            );

            eventStore.AppendEvent(debitTransactionEvent); //TODO: implement simultaneous event append with sql transactions
            eventStore.AppendEvent(creditTransactionEvent);

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

        public bool Handle(CancelFinancialOperationCommand command)
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

            eventStore.AppendEvent(cancelEvent);

            return true;
        }
    }

    public class UpdateFinancialOperationCommandHandler : ICommandHandler<UpdateFinancialOperationCommand>
    {
        private readonly IEventStore eventStore;
        private readonly ITransactionRepository transactionRepository;
        private readonly IAccountRepository accountRepository;


        public UpdateFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository, IAccountRepository accountRepository)
        {
            this.eventStore = eventStore;
            this.transactionRepository = transactionRepository;
            this.accountRepository = accountRepository;
        }

        public bool Handle(UpdateFinancialOperationCommand command)
        {
            var existingTransactions = transactionRepository.GetTransactionsByOperationId(command.OperationId);

            var eventsToAppend = new List<Event>();

            var userIncomeAccountId = accountRepository.GetUserAccounts(command.UserId, AccountType.Debit).FirstOrDefault().Id;
            var userExpenseAccountId = accountRepository.GetUserAccounts(command.UserId, AccountType.Credit).FirstOrDefault().Id;

            if (Math.Abs(command.Amount) != Math.Abs(existingTransactions[0].Amount))
            {
                eventsToAppend.Add(new FinancialOperationAmountUpdatedEvent(command.OperationId, command.Amount));
            }

            if (command.Title != existingTransactions[0].Title)
            {
                eventsToAppend.Add(new FinancialOperationTitleUpdatedEvent(command.OperationId, command.Title));
            }

            if (command.CategoryId != existingTransactions[0].CategoryId)
            {
                eventsToAppend.Add(new FinancialOperationCategoryIdUpdatedEvent(command.OperationId, command.CategoryId));
            }

            if (command.Note != existingTransactions[0].Note)
            {
                eventsToAppend.Add(new FinancialOperationNoteUpdatedEvent(command.OperationId, command.Note));
            }

            if (command.CreatedAt != existingTransactions[0].CreatedAt)
            {
                eventsToAppend.Add(new FinancialOperationCreatedAtUpdatedEvent(command.OperationId, command.CreatedAt));
            }

            foreach (var transaction in existingTransactions)
            {
                if (transaction.Amount > 0 && transaction.AccountId != userExpenseAccountId && command.ToAccountId.HasValue && command.ToAccountId != transaction.AccountId)
                {
                    eventsToAppend.Add(new FinancialOperationAccountUpdatedEvent(transaction.Id, (Guid)command.ToAccountId));
                }
                if (transaction.Amount < 0 && transaction.AccountId != userIncomeAccountId && command.FromAccountId.HasValue && command.ToAccountId != transaction.AccountId)
                {
                    eventsToAppend.Add(new FinancialOperationAccountUpdatedEvent(transaction.Id, (Guid)command.FromAccountId));
                }
            }
            

            foreach (var @event in eventsToAppend)
            {
                eventStore.AppendEvent(@event);
            }

            return true;
        }
    }
}
