namespace MoneyTracker.App.GraphQl.Category.Types.Inputs
{
    public class CreateCategoryInput
    {
        public string Name { get; set; }

        public string Type { get; set; }

        public string IconUrl { get; set; }

        public string Color { get; set; }
    }
}
