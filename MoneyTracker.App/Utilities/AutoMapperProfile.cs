using AutoMapper;
using MoneyTracker.App.GraphQl.Auth.Types.Inputs;
using MoneyTracker.Business.Entities;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserCreateInput, User>().ReverseMap();
            CreateMap<Transaction, TransactionDto>().ReverseMap();
        }
    }
}
