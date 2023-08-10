namespace MoneyTracker.Business.Services
{
    public static class ObjectValueChangeService
    {
        public static void ObjectValueChange<T>(T source, ref T target) {
            var properties = typeof(T).GetProperties();
            foreach (var property in properties)
            {
                if (property.CanWrite)
                {
                    property.SetValue(target, property.GetValue(source));
                }
            }
        }
    }
}
