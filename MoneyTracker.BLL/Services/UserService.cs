using AutoMapper;
using MoneyTracker.BLL.DTO_s.User;
using MoneyTracker.BLL.Exceptions;
using MoneyTracker.BLL.Services.IServices;
using MoneyTracker.DAL.Entities;
using MoneyTracker.DAL.Repositories.IRepositories;

namespace MoneyTracker.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        public UserDto GetUserById(int id)
        {
            var user = userRepository.GetUserById(id);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return mapper.Map<UserDto>(user);
        }
        
        public UserDto GetUserByEmail(string email)
        {
            var user = userRepository.GetUserByEmail(email);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return mapper.Map<UserDto>(user);
        }

        public UserDto CreateUser(UserCreateDto userCreateDto)
        {
            var newUser = mapper.Map<User>(userCreateDto);

            var createdUser = userRepository.CreateUser(newUser);

            return mapper.Map<UserDto>(createdUser);
        }

        public UserDto UpdateUser(int id, UserUpdateDto userUpdateDto)
        {
            var existingUser = userRepository.GetUserById(id);

            if (existingUser == null)
            {
                throw new NotFoundException("User not found");
            }

            existingUser.Name = userUpdateDto.Name;
            existingUser.Email = userUpdateDto.Email;
            existingUser.RefreshToken = userUpdateDto.RefreshToken;

            var updatedUser = userRepository.UpdateUser(existingUser);

            return mapper.Map<UserDto>(updatedUser);
        }

        public bool DeleteUser(int id)
        {
            var existingUser = userRepository.GetUserById(id);

            if (existingUser == null)
            {
                throw new NotFoundException("User not found");
            }

            var result = userRepository.DeleteUser(existingUser);

            return result;
        }
    }
}
