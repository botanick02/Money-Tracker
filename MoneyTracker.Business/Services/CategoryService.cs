using MoneyTracker.Business.Entities;
using static MoneyTracker.Business.Events.Categories.CategoryEvents;

namespace MoneyTracker.Business.Services
{
    public class CategoryService
    {

        public static Category Evolve(Category category, object @event)
        {
            return @event switch
            {
                
            };
        }


       

    }
}
