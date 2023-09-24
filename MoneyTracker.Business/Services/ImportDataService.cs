using Microsoft.AspNetCore.Http;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Events;
using MoneyTracker.Business.Events.Categories;
using MoneyTracker.Business.Events.FinancialOperation;
using MoneyTracker.Business.Interfaces;
using OfficeOpenXml;
using System.Diagnostics;
using System.Globalization;

namespace MoneyTracker.Business.Services
{
    public class ImportDataService
    {
        private readonly IMccCodeRepository mccCodeRepository;
        private readonly IEventStore eventStore;
        private readonly ICategoryRepository categoryRepository;
        private readonly IAccountRepository accountRepository;

        public ImportDataService(IMccCodeRepository mccCodeRepository, IEventStore eventStore, ICategoryRepository categoryRepository, IAccountRepository accountRepository)
        {
            this.mccCodeRepository = mccCodeRepository;
            this.eventStore = eventStore;
            this.categoryRepository = categoryRepository;
            this.accountRepository = accountRepository;
        }

        public async Task<bool> ImportTransactions(IFormFile file, Guid userId, Guid userAccountId)
        {
            try
            {
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0];

                        int startRow = FindStartRow(worksheet);
                        if (startRow == 0)
                        {
                            return false;
                        }

                        var usersDebitAccount = GetAccountByType(userId, AccountType.Debit);
                        var usersCreditAccount = GetAccountByType(userId, AccountType.Credit);

                        var importEvents = new List<Event>();
                        var newCategories = new List<CategoryMinId>();

                        for (int row = startRow; row <= worksheet.Dimension.Rows; row++)
                        {
                            var transactionData = GetTransactionData(worksheet, row);
                            var mccCode = mccCodeRepository.GetMccById(transactionData.Mcc);

                            var category = categoryRepository.GetCategoryByName(userId, mccCode.ShortDescription);

                            var transType = GetTransactionType(transactionData.CardCurrencyAmount);

                            var transactionId = Guid.NewGuid();
                            var amount = Math.Abs(transactionData.CardCurrencyAmount);

                            var dateTime = ParseDateTime(transactionData.DateAndTime);

                            Guid catId = Guid.NewGuid();

                            if (category == null)
                            {
                                var newCat = newCategories.FirstOrDefault(c => c.Name == mccCode.ShortDescription);

                                if (newCat != null && transType == newCat.Type)
                                {
                                    catId = newCat.Id;
                                }
                                else
                                {
                                    AddNewCategoryAndEvent(newCategories, importEvents, mccCode, userId, transType, catId);
                                }
                            }
                            else
                            {
                                catId = category.Id;
                            }

                            AddTransactionEvents(importEvents, userId, catId, dateTime, transType, userAccountId, usersDebitAccount, usersCreditAccount, transactionData, transactionId, amount);
                        }

                        await eventStore.AppendEventsAsync(importEvents);

                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                HandleImportException(ex);
                return false;
            }
        }

        private int FindStartRow(ExcelWorksheet worksheet)
        {
            for (int row = 1; row <= worksheet.Dimension.Rows; row++)
            {
                var cellValue = worksheet.Cells[row, 1].Text;
                if (cellValue.Contains("Date and time"))
                {
                    return row + 1;
                }
            }
            return 0;
        }

        private Guid GetAccountByType(Guid userId, Entities.AccountType accountType)
        {
            return accountRepository.GetUserAccounts(userId, accountType).FirstOrDefault()!.Id;
        }

        private TransactionData GetTransactionData(ExcelWorksheet worksheet, int row)
        {
            var data = new TransactionData
            {
                DateAndTime = worksheet.Cells[row, 1].Text,
                Description = worksheet.Cells[row, 2].Text,
                Mcc = worksheet.Cells[row, 3].Text,
                CardCurrencyAmount = decimal.Parse(worksheet.Cells[row, 4].Text),
            };
            return data;
        }

        private TransactionTypes GetTransactionType(decimal cardCurrencyAmount)
        {
            return cardCurrencyAmount > 0 ? TransactionTypes.Income : TransactionTypes.Expense;
        }

        private DateTime ParseDateTime(string dateAndTime)
        {
            string format = "dd.MM.yyyy HH:mm:ss";
            return DateTime.ParseExact(dateAndTime, format, CultureInfo.InvariantCulture, DateTimeStyles.None);
        }

        private void AddNewCategoryAndEvent(List<CategoryMinId> newCategories, List<Event> importEvents, MccCode mccCode, Guid userId, TransactionTypes transType, Guid catId)
        {
            importEvents.Add(new CategoryCreatedEvent(catId, userId, mccCode.ShortDescription, transType, mccCode.IconUrl ?? "./media/icons/import.svg", mccCode.Color ?? "#d9d9d9"));
            newCategories.Add(new CategoryMinId() { Name = mccCode.ShortDescription, Id = catId, Type = transType });
        }

        private void AddTransactionEvents(List<Event> importEvents, Guid userId, Guid catId, DateTime dateTime, TransactionTypes transType, Guid userAccountId, Guid usersDebitAccount, Guid usersCreditAccount, TransactionData transactionData, Guid transactionId, decimal amount)
        {
            importEvents.AddRange(new List<Event>
    {
        new DebitTransactionAddedEvent
        (
            OperationId: transactionId,
            UserId: userId,
            CategoryId: catId,
            CreatedAt: dateTime,
            AccountId: transType == TransactionTypes.Income ? userAccountId : usersCreditAccount,
            Title: transactionData.Description,
            Note: null,
            Amount: amount
        ),
        new CreditTransactionAddedEvent
        (
            OperationId: transactionId,
            UserId: userId,
            CategoryId: catId,
            CreatedAt: dateTime,
            AccountId: transType == TransactionTypes.Expense ? userAccountId : usersDebitAccount,
            Title: transactionData.Description,
            Note: null,
            Amount: amount
        )
    });
        }

        private void HandleImportException(Exception ex)
        {
            // Handle any exceptions that might occur during the import.
            Debug.WriteLine("Error importing transactions: " + ex.Message);
        }

        private class TransactionData
        {
            public string DateAndTime { get; set; }
            public string Description { get; set; }
            public string Mcc { get; set; }
            public decimal CardCurrencyAmount { get; set; }
        }

        public class CategoryMinId
        {
            public string Name { get; set; }

            public Guid Id { get; set; }

            public TransactionTypes Type { get; set; }
        }
    }
}
