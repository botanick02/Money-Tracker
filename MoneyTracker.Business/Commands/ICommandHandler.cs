namespace MoneyTracker.Business.Commands
{
    public interface ICommandHandler<T>
    {
        bool Handle(T command);
    }
}
