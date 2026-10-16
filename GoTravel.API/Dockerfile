FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["GoTravel.API.csproj", "./"]
RUN dotnet restore "GoTravel.API.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "GoTravel.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GoTravel.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "GoTravel.API.dll"]
