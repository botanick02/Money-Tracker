using MoneyTracker.Business.Commands;

namespace MoneyTracker.Business.CommandHandlers
{
    public interface ICommandHandler<TCommand>
        where TCommand : ICommand
    {
        void Handle(TCommand command);
    }
}
