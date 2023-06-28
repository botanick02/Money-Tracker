namespace MoneyTracker.Business.Events
{
    public record Event
    {
        public Guid Id { get; init; }

        public Guid StreamId { get; init; }

        public int Version { get; init; }

        public string Type { get; init; }

        public DateTime CreatedAt { get; init; }

        public string Data { get; init; }
    }
}
