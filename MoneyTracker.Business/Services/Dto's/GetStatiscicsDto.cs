using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Services.Dto_s
{
    public class GetStatiscicsDto
    {
        public string CategoryName { get; set; }
        public decimal Sum { get; set; }
        public decimal Percentage { get; set; }

    }
}
