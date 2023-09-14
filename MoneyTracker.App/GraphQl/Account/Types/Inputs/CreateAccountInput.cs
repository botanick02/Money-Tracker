using MoneyTracker.App.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class CreateAccountInput
    {
        [GuidValidationAttribute(ErrorMessage = "OperationId is invalid")]


        [Required(ErrorMessage = "Title: Title is required")]
        public string accountName { get; set; }
        public string currencyCode { get; set; }


    }
}
