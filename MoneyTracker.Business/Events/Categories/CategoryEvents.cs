namespace MoneyTracker.Business.Events.Categories
{
    public class CategoryEvents
    {
        public record CategoryCreatedEvent : Event
        {
            public Guid Id { get; init; }

            public string Name { get; init; }

            public string Type { get; init; }
        }

        public record CategoryNameUpdatedEvent : Event
        {
            public Guid Id { get; init; }

            public string Name { get; init; }
        }
    }
}
