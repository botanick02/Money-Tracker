namespace MoneyTracker.Business.Events.Categories
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