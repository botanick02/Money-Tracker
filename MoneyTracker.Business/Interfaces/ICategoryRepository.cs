using MoneyTracker.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.Business.Interfaces
{
    public interface ICategoryRepository
    {
        public List<Category> GetCategories(DateTime? dateTimeTo = null);
    }
}
