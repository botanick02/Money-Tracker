using MoneyTracker.App.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class CreateCategoryInput
    {
        public string Name { get; set; }

        [CategoryTypeValidationAttribute(ErrorMessage = "Category type is invalid")]
        public string Type { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }
    }
}
