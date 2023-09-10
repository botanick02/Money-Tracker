# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
# For more information, please see https://aka.ms/containercompat
# escape=`
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["MoneyTracker.App/MoneyTracker.App.csproj", "MoneyTracker.App/"]
COPY ["MoneyTracker.DataAccess/MoneyTracker.DataAccess.csproj", "MoneyTracker.DataAccess/"]
RUN dotnet restore "MoneyTracker.App/MoneyTracker.App.csproj"
COPY . .
WORKDIR "/src/MoneyTracker.App/client" 

RUN npm i
RUN npm run build

WORKDIR "/src/MoneyTracker.App"

RUN dotnet build "MoneyTracker.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MoneyTracker.App.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# COPY JSON files from the Resources directory of MoneyTracker.DataAccess
COPY ["MoneyTracker.DataAccess/Resources/", "/app/Resources/"]
ENTRYPOINT ["dotnet", "MoneyTracker.App.dll"]
