using GraphQL;
using Microsoft.Extensions.Primitives;

namespace MoneyTracker.App.Helpers
{
    public class HeaderTimeTravelProviderParser
    {
        public DateTime? ParseTravelDateTime(IResolveFieldContext context)
        {
            var httpContext = context.RequestServices!.GetService<IHttpContextAccessor>()!.HttpContext ?? throw new InvalidOperationException("HttpContext was not available");
            var timeTravelDate = httpContext.Request.Headers["Source"];

            if (timeTravelDate == StringValues.Empty)
            {
                return null;
            }

            if (DateTime.TryParse(timeTravelDate, out DateTime source))
            {
                return source;
            }
            else
            {
                throw new ArgumentOutOfRangeException($"'{timeTravelDate}' is not a valid value of DateTime which was sent in request header.", nameof(timeTravelDate));
            }
        }
    }
}