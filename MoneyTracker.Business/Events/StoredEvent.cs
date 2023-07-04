namespace MoneyTracker.Business.Events
{
    public record StoredEvent
    {
        public int Id { get; init; }

        public string Type { get; init; }

        public DateTime CreatedAt { get; init; }

        public string Data { get; init; }
    }
}
