using MoneyTracker.Business.Entities;
using System.ComponentModel.DataAnnotations;

namespace MoneyTracker.App.Helpers
{
    public static class ModelValidationHelper
    {
        public static bool ValidateModel<T>(T model, out List<ValidationResult> results)
        {
            results = new List<ValidationResult>();
            ValidationContext validationContext = new ValidationContext(model!);
            return Validator.TryValidateObject(model!, validationContext, results, true);
        }
    }

    public class GuidValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null)
            {
                return true;
            }
            if (value is string stringValue)
            {
                return Guid.TryParse(stringValue, out _);
            }

            return false;
        }
    }

    public class CategoryTypeValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null)
            {
                return true;
            }
            if (value is string stringValue)
            {
                return Enum.TryParse<TransactionTypes>(stringValue, out _);
            }

            return false;
        }
    }
}
