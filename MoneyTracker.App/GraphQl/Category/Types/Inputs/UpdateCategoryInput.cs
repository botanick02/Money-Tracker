using MoneyTracker.App.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class UpdateCategoryInput
    {
        [GuidValidationAttribute(ErrorMessage = "OperationId is invalid")]
        [Required(ErrorMessage = "Id: Id is required")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Title: Title is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Type: Type is required")]
        public string Type { get; set; }

        [Required(ErrorMessage = "IconUrl: IconUrl is required")]
        public string IconUrl { get; set; }

        [Required(ErrorMessage = "Color: Color is required")]
        public string Color { get; set; }
    }
}
