namespace MoneyTracker.Business.Commands
{
    public interface ICommandHandler<T>
    {
        Task<bool> HandleAsync(T command);
    }
}
