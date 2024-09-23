# Use the official .NET SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE $PORT
# Copy the .NET project files and restore dependencies
COPY ["MoneyTracker.App/MoneyTracker.App.csproj", "MoneyTracker.App/"]
COPY ["MoneyTracker.DataAccess/MoneyTracker.DataAccess.csproj", "MoneyTracker.DataAccess/"]
RUN dotnet restore "MoneyTracker.App/MoneyTracker.App.csproj"

COPY . /app
WORKDIR "/app/MoneyTracker.App"
RUN dotnet build "MoneyTracker.App.csproj" -c Release -o /app/build

FROM build-env AS publish
RUN dotnet publish "MoneyTracker.App.csproj" -c Release -o /app/publish

from node as node-builder
WORKDIR /node
COPY ./MoneyTracker.App/client /node
RUN npm install --force
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
RUN mkdir /app/wwroot
COPY --from=publish /app/publish .
COPY --from=node-builder /node/build ./wwwroot
COPY ["MoneyTracker.DataAccess/Resources/", "/app/Resources/"]

CMD ["dotnet", "MoneyTracker.App.dll"]
