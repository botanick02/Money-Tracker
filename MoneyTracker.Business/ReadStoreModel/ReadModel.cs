using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.ReadStoreModel
{
    public class ReadModel
    {
        public List<User> Users { get; set; } = new List<User>();
        public List<Category> Categories { get; set; } = new List<Category>();
    }
}
