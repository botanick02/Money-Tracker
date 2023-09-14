using Microsoft.AspNetCore.Http;
using MoneyTracker.Business.Interfaces;
using OfficeOpenXml;
using System.Diagnostics;

namespace MoneyTracker.Business.Services
{
    public class ImportDataService
    {
        private readonly IMccCodeRepository mccCodeRepository;

        public ImportDataService(IMccCodeRepository mccCodeRepository)
        {
            this.mccCodeRepository = mccCodeRepository;
        }

        public bool ImportTransactions(IFormFile file)
        {
            try
            {
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0]; // Assuming the transactions are in the first worksheet.

                        // Find the starting row of transactions (assuming the format is consistent).
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
                            // Transactions not found in the file.
                            return false;
                        }

                        // Process transactions from the Excel file.
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

                            Debug.WriteLine(dateAndTime + " " + description + " " + mccCodeRepository.GetMccNameById(mcc) + " " + operationAmount);
                        }

                        // At this point, you have processed all transactions.
                        // You can return true or perform any necessary actions.
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
}
