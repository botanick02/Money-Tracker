namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryEvents
    {
        public record CategoryCreatedEvent
        {
            public Guid Id { get; init; }

            public string Name { get; init; }

            public string Type { get; init; }
        }

        public record CategoryNameUpdatedEvent
        {
            public Guid Id { get; init; }

            public string Name { get; init; }
        }
    }
}
