using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface IPasswordHashService
    {
        string HashPassword(string password, out string salt);

        bool VerifyPassword(string password, string hashedPassword, string salt);
    }
}
