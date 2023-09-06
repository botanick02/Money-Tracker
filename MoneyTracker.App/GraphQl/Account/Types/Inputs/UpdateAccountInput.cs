using MoneyTracker.App.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class UpdateAccountInput
    {
        [GuidValidationAttribute(ErrorMessage = "OperationId is invalid")]
        public string AccountId { get; set; }

        [Required(ErrorMessage = "Title: Title is required")]
        public string Name { get; set; }

        
    }
}
