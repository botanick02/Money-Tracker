namespace MoneyTracker.App.Helpers
{
    public static class EnumParser
    {
        public static T ParseToEnum<T>(string value) where T : struct, IConvertible
        {
            var stringValue = value.ToLowerInvariant();
            stringValue = char.ToUpperInvariant(stringValue[0]) + stringValue.Substring(1);
            return Enum.Parse<T>(stringValue);
        }
    }
}
