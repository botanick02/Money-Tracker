using Microsoft.Extensions.DependencyInjection;
using System;

namespace MoneyTracker.Business.Commands
{
    public class CommandDispatcher
    {
        private readonly IServiceProvider serviceProvider;

        public CommandDispatcher(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task DispatchAsync<TCommand>(TCommand command)
        {
            var handler = serviceProvider.GetService<ICommandHandler<TCommand>>();
            if (handler == null)
            {
                throw new InvalidOperationException($"No command handler found for command type {typeof(TCommand).Name}");
            }

            await handler.HandleAsync(command);
        }

    }
}