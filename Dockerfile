# Use the official .NET SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE $PORT
# Copy the .NET project files and restore dependencies
COPY ["MoneyTracker.App/MoneyTracker.App.csproj", "MoneyTracker.App/"]
COPY ["MoneyTracker.DataAccess/MoneyTracker.DataAccess.csproj", "MoneyTracker.DataAccess/"]
RUN dotnet restore "MoneyTracker.App/MoneyTracker.App.csproj"

# Copy the entire solution and build the backend
COPY . .
WORKDIR "/app/MoneyTracker.App/client"
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
RUN npm install --force
RUN npm run build

WORKDIR "/app/MoneyTracker.App"
COPY ["MoneyTracker.App/wwwroot/", "/app/wwwroot/"]

WORKDIR "/app/MoneyTracker.App"
RUN dotnet build "MoneyTracker.App.csproj" -c Release -o /app/build

# Publish the backend
FROM build-env AS publish
RUN dotnet publish "MoneyTracker.App.csproj" -c Release -o /app/publish

# Create the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ["MoneyTracker.DataAccess/Resources/", "/app/Resources/"]

# Set the entry point to run the ASP.NET app
CMD ["dotnet", "MoneyTracker.App.dll"]
