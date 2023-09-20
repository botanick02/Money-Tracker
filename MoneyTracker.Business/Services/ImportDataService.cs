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

        public bool ImportTransactions(IFormFile file, Guid userId, Guid userAccountId)
        {
            try
            {
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0];

                        int startRow = 0;
                        for (int row = 1; row <= worksheet.Dimension.Rows; row++)
                        {
                            var cellValue = worksheet.Cells[row, 1].Text;
                            if (cellValue.Contains("Date and time"))
                            {
                                startRow = row + 1;
                                break;
                            }
                        }

                        if (startRow == 0)
                        {
                            return false;
                        }

                        var usersDebitAccount = accountRepository.GetUserAccounts(userId, Entities.AccountType.Debit).FirstOrDefault()!.Id;
                        var usersCreditAccount = accountRepository.GetUserAccounts(userId, Entities.AccountType.Credit).FirstOrDefault()!.Id;

                        var importEvents = new List<Event>();
                        var newCategories = new List<CategoryMinId>();


                        for (int row = startRow; row <= worksheet.Dimension.Rows; row++)
                        {
                            var dateAndTime = worksheet.Cells[row, 1].Text;
                            var description = worksheet.Cells[row, 2].Text;
                            var mcc = worksheet.Cells[row, 3].Text;
                            var cardCurrencyAmount = worksheet.Cells[row, 4].Text;
                            var operationAmount = worksheet.Cells[row, 5].Text;
                            var operationCurrency = worksheet.Cells[row, 6].Text;
                            var exchangeRate = worksheet.Cells[row, 7].Text;
                            var commission = worksheet.Cells[row, 8].Text;
                            var cashbackAmount = worksheet.Cells[row, 9].Text;
                            var balance = worksheet.Cells[row, 10].Text;

                            var mccName = mccCodeRepository.GetMccById(mcc).ShortDescription;

                            var category = categoryRepository.GetCategoryByName(userId, mccName);

                            var transType = decimal.Parse(cardCurrencyAmount) > 0 ? TransactionTypes.Income : TransactionTypes.Expense;

                            var transactionId = Guid.NewGuid();

                            var amount = decimal.Abs(decimal.Parse(cardCurrencyAmount));

                            string format = "dd.MM.yyyy HH:mm:ss";

                            var dateTime = DateTime.ParseExact(dateAndTime, format, CultureInfo.InvariantCulture, DateTimeStyles.None);

                            var catId = Guid.NewGuid();


                            if (category == null)
                            {
                                var newCat = newCategories.FirstOrDefault(c => c.Name == mccName);

                                if (newCat != null)
                                {
                                    catId = newCat.Id;
                                }
                                else
                                {
                                    importEvents.Add(new CategoryCreatedEvent(catId, userId, mccName, transType, "./media/icons/import.svg", "#d9d9d9"));
                                    newCategories.Add(new CategoryMinId() { Name = mccName, Id = catId });
                                }
                            }
                            else
                            {
                                catId = category.Id;
                            }

                            importEvents.AddRange(new List<Event>
                            {
                                new DebitTransactionAddedEvent
                            (
                                OperationId: transactionId,
                                UserId: userId,
                                CategoryId: catId,
                                CreatedAt: dateTime,
                                AccountId: transType == TransactionTypes.Income ? userAccountId : usersCreditAccount,
                                Title: description,
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
                                Title: description,
                                Note: null,
                                Amount: amount
                            )
                            });
                        }

                        eventStore.AppendEventsAsync(importEvents);

                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur during the import.
                Debug.WriteLine("Error importing transactions: " + ex.Message);
                return false;
            }
        }
    }
    public class CategoryMinId
    {
        public string Name { get; set; }

        public Guid Id { get; set; }
    }
}
