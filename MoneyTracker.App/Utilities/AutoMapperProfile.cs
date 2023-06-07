using AutoMapper;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.Business.Entities;

namespace MoneyTracker.Business.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserCreateInput, User>().ReverseMap();
        }
    }
}
