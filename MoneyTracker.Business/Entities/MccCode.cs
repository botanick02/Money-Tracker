namespace MoneyTracker.Business.Entities
{
    public class MccCode
    {
        public string Mcc { get; set; }

        public string ShortDescription { get; set; }

        public string FullDescription { get; set; }

        public string? IconUrl { get; set; } = null;

        public string? Color { get; set; } = null;
    }
}
