using AutoMapper;
using MoneyTracker.BLL.DTO_s.User;
using MoneyTracker.DAL.Entities;

namespace MoneyTracker.BLL.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<UserCreateDto, User>().ReverseMap();
        }
    }
}
