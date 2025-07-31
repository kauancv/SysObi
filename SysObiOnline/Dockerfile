# Usamos a imagem do SDK como base para tudo
FROM mcr.microsoft.com/dotnet/sdk:8.0

# 1. Instala as ferramentas do EF Core e adiciona ao PATH
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# 2. Instala as ferramentas necessárias (sqlcmd)
RUN apt-get update && apt-get install -y gnupg curl apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

# 3. Copia e restaura as dependências do projeto
WORKDIR /src
COPY ["SysObiOnline/SysObiOnline.csproj", "SysObiOnline/"]
RUN dotnet restore "SysObiOnline/SysObiOnline.csproj"

# 4. Copia o resto do código e publica a aplicação
COPY . .
WORKDIR "/src/SysObiOnline"
RUN dotnet publish "SysObiOnline.csproj" -c Release -o /app/publish

# 5. Configura o ambiente final para execução
WORKDIR /app/publish
COPY SysObiOnline/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# 6. Define o ponto de entrada para ser o nosso script customizado
ENTRYPOINT ["./entrypoint.sh"]