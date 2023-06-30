namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryEvents
    {
        public record CategoryCreated
        {
            public Guid Id { get; init; }

            public string Name { get; init; }

            public string Type { get; init; }
        }

        public record CategoryNameUpdated
        {
            public Guid Id { get; init; }

            public string Name { get; init; }
        }
    }
}
