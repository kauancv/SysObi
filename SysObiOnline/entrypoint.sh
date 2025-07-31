#!/bin/bash

# Define um timeout e um contador
max_retries=12
retry_count=0

echo "Aguardando o SQL Server ficar pronto..."

# Loop para esperar o banco de dados aceitar conexões
# (Usando a senha que vem do docker-compose)
until /opt/mssql-tools/bin/sqlcmd -S db -U sa -P "$SA_PASSWORD" -q "SELECT 1" &> /dev/null
do
  retry_count=$((retry_count+1))
  if [ $retry_count -ge $max_retries ]; then
    echo "Erro: SQL Server não ficou disponível a tempo."
    exit 1
  fi
  echo "Tentando conectar ao SQL Server (tentativa $retry_count/$max_retries)..."
  sleep 5
done

echo "SQL Server está pronto. Aplicando migrations..."

# Navega para a pasta do projeto para rodar as migrations
cd /src/SysObiOnline
dotnet ef database update

echo "Migrations aplicadas com sucesso. Iniciando a aplicação..."

# Navega para a pasta de publicação e inicia a API
cd /app/publish
dotnet SysObiOnline.dll