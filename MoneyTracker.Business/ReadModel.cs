using MoneyTracker.Business.Entities;
using MoneyTracker.Business.EventAppliers;
using MoneyTracker.Business.Interfaces;

namespace MoneyTracker.Business
{
    public class ReadModel
    {
        public List<User> Users { get; set; } = new List<User>();
        public List<Category> Categories { get; set; } = new List<Category>();
    }
}
