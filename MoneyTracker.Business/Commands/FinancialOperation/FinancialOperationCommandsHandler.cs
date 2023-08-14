using MoneyTracker.Business.Commands.Category;
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
        private readonly ICategoryRepository categoryRepository;

        public AddDebitOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
        }

        public async Task<bool> HandleAsync(AddDebitOperationCommand command)
        {
            var category = categoryRepository.GetCategoryById(command.CategoryId);

            if (category == null || category.Type != "income")
            {
                throw new ArgumentException("CategoryId: CategoryId is invalid");
            }

            if (accountRepository.GetUserAccountById(command.ToAccountId) == null)
            {
                throw new ArgumentException("ToAccountId: ToAccountId is invalid");
            }

            var eventsToAppend = new List<Event>();

            var transactionId = Guid.NewGuid();

            var usersDebitAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Debit).FirstOrDefault();

            var currentTime = DateTime.UtcNow;

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
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
                CreatedAt: command.CreatedAt ?? currentTime,
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
        private readonly ICategoryRepository categoryRepository;

        public AddCreditOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
        }

        public async Task<bool> HandleAsync(AddCreditOperationCommand command)
        {
            if (accountRepository.GetUserAccountById(command.FromAccountId) == null)
            {
                throw new ArgumentException("FromAccountId: FromAccountId is invalid");
            }


            var category = categoryRepository.GetCategoryById(command.CategoryId);

            if (category == null || category.Type != "expense")
            {
                throw new ArgumentException("CategoryId: CategoryId is invalid");
            }

            var transactionId = Guid.NewGuid();

            var usersCreditAccount = accountRepository.GetUserAccounts(command.UserId, Entities.AccountType.Credit).FirstOrDefault();

            var currentTime = DateTime.UtcNow;

            var eventsToAppend = new List<Event>();

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                AccountId: usersCreditAccount.Id,
                CreatedAt: command.CreatedAt ?? currentTime,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            eventsToAppend.Add(new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: command.CategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
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
        private readonly ICategoryRepository categoryRepository;

        public AddTransferOperationCommandHandler(IEventStore eventStore, IAccountRepository accountRepository, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
        }

        public async Task<bool> HandleAsync(AddTransferOperationCommand command)
        {
            if (accountRepository.GetUserAccountById(command.FromAccountId) == null)
            {
                throw new ArgumentException("FromAccountId: FromAccountId is invalid");
            }

            if (accountRepository.GetUserAccountById(command.ToAccountId) == null)
            {
                throw new ArgumentException("ToAccountId: ToAccountId is invalid");
            }

            if (categoryRepository.GetCategoryById(command.CategoryId) == null)
            {
                throw new ArgumentException("CategoryId: CategoryId is invalid");
            }

            var eventsToAppend = new List<Event>();

            var transactionId = Guid.NewGuid();

            var currentTime = DateTime.UtcNow;

            var transferCategoryId = categoryRepository.GetTransferCategory(command.UserId).Id;

            eventsToAppend.Add(new DebitTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: transferCategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
                AccountId: command.ToAccountId,
                Title: command.Title,
                Note: command.Note,
                Amount: command.Amount
            ));

            eventsToAppend.Add(new CreditTransactionAddedEvent
            (
                OperationId: transactionId,
                UserId: command.UserId,
                CategoryId: transferCategoryId,
                CreatedAt: command.CreatedAt ?? currentTime,
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
                throw new ArgumentException("OperationId: OperationId is invalid");
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
        private readonly IAccountRepository accountRepository;
        private readonly ICategoryRepository categoryRepository;


        public UpdateFinancialOperationCommandHandler(IEventStore eventStore, ITransactionRepository transactionRepository, IAccountRepository accountRepository, ICategoryRepository categoryRepository)
        {
            this.eventStore = eventStore;
            this.transactionRepository = transactionRepository;
            this.accountRepository = accountRepository;
            this.categoryRepository = categoryRepository;
        }

        public async Task<bool> HandleAsync(UpdateFinancialOperationCommand command)
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
                if (categoryRepository.GetCategoryById(command.CategoryId) == null)
                {
                    throw new ArgumentException("CategoryId: CategoryId is invalid");
                }
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

            await eventStore.AppendEventsAsync(eventsToAppend);

            return true;
        }
    }
}
