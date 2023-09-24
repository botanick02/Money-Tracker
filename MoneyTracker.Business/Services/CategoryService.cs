using AutoMapper;
using MoneyTracker.Business.Interfaces;
using MoneyTracker.Business.Services.Dto_s;

namespace MoneyTracker.Business.Services
{
    public class CategoryService
    {
        private ICategoryRepository categoryRepository;
        private IMapper mapper;
        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        public List<CategoryDto> GetCategories(Guid userId, DateTime? timeTravelDateTime = null)
        {
            var categories = categoryRepository.GetCategories(userId, timeTravelDateTime);

            return mapper.Map<List<CategoryDto>>(categories);
        }
    }
}
