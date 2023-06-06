using Microsoft.AspNetCore.Http;
using MoneyTracker.BLL.DTO_s.User;

namespace MoneyTracker.BLL.Services.IServices
{
    public interface IUserService
    {
        UserDto GetUserById(int id);

        UserDto GetUserByEmail(string email);

        UserDto CreateUser(UserCreateDto userCreateDto);

        UserDto UpdateUser(int id, UserUpdateDto userUpdateDto);

        bool DeleteUser(int id);
    }
}
