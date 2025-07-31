# 🧠 SysObiOnline - Sistema Completo (Back-end + Front-end)

Sistema de questões para alunos da Olimpíada Brasileira de Informática (OBI), desenvolvido pela Universidade Federal do Ceará (UFC).

---

## 📦 Tecnologias Utilizadas

- **Back-end:** ASP.NET Core 8, Entity Framework Core  
- **Front-end:** React.js  
- **Banco de Dados:** Microsoft SQL Server  
- **Ambiente:** Docker & Docker Compose  

---

## 🚀 Executando o Projeto com Docker (Método Recomendado)

A maneira mais simples e recomendada de executar este projeto é utilizando Docker. Todo o ambiente (Front-end, Back-end e Banco de Dados) será orquestrado automaticamente.

### 🛠 Pré-requisitos

- Docker  
- Docker Compose (geralmente já vem com o Docker Desktop)  

### ⚙️ Passos para a Execução

1. **Clone o Repositório**

```bash
git clone <URL_DO_REPOSITORIO>
```

2. **Configure as Variáveis de Ambiente (Senha do Banco)**

A aplicação precisa de uma senha para o banco de dados. Para manter isso seguro, usamos um arquivo `.env`.

- a. Na raiz do projeto, localize o arquivo `.env.example`.  
- b. Faça uma cópia deste arquivo e renomeie para `.env`.  
- c. Abra o `.env` e defina uma senha forte para a variável `SA_PASSWORD`.

Exemplo:

```
SA_PASSWORD=SuaSenhaSuperForte!123
```

3. **Suba a Aplicação**

Abra um terminal na raiz do projeto e execute:

```bash
sudo docker-compose up --build
```

> **Nota:** Use `sudo` em ambientes Linux. No Windows ou Mac, apenas `docker-compose up --build` basta.

Esse comando irá:  
- Construir as imagens do back-end e front-end do zero.  
- Iniciar os três contêineres (banco de dados, back-end e front-end) e conectá-los.  
- Aplicar automaticamente as migrations do Entity Framework para criar tabelas e o usuário administrador.

A primeira execução pode levar alguns minutos, pois baixa as imagens necessárias.

4. **Acesse a Aplicação**

- Front-end (React): [http://localhost:3000](http://localhost:3000)  
- Back-end (Swagger API): [http://localhost:5037/swagger](http://localhost:5037/swagger)

5. **Banco de Dados (Opcional)**

Você pode se conectar ao banco usando ferramentas como DBeaver ou Azure Data Studio.

- Servidor: `localhost,1433`  
- Usuário: `sa`  
- Senha: a senha que você definiu no `.env`

6. **Parando a Aplicação**

Para parar e remover contêineres e rede:

```bash
Ctrl + C
sudo docker-compose down
```

Para também remover o volume de dados (apagar dados do banco):

```bash
sudo docker-compose down -v
```

---

## 🔧 Executando o Projeto Localmente (Sem Docker)

Se preferir executar manualmente cada parte do projeto, siga os passos abaixo.

### 🛠 Pré-requisitos

- .NET 8 SDK  
- Node.js (versão 18 ou superior)  
- SQL Server (Express ou Developer Edition)  
- Ferramenta para gerenciamento do banco (SSMS, Azure Data Studio etc.)

### ⚙️ Passos para a Execução

#### 1. Configurar Banco de Dados

- a. Crie o banco vazio no SQL Server:

```sql
CREATE DATABASE SysObi;
```

- b. Configure a connection string no arquivo `appsettings.Development.json` dentro da pasta do back-end (`SysObiOnline`):

Exemplo para autenticação Windows:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=SysObi;Integrated Security=True;TrustServerCertificate=True;"
}
```

Exemplo para autenticação com usuário e senha:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=SysObi;User Id=SEU_USUARIO;Password=SUA_SENHA;TrustServerCertificate=True;"
}
```

#### 2. Executar o Back-end (.NET)

No terminal:

```bash
cd SysObiOnline
dotnet restore
dotnet ef database update
dotnet run
```

A API estará rodando em: [http://localhost:5037](http://localhost:5037)

#### 3. Executar o Front-end (React)

Abra um novo terminal, e execute:

```bash
cd Front-Completo/front-part1-main
npm install
npm start
```

O front estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 💬 Contato

Em caso de dúvidas, problemas ou sugestões, abra uma issue neste repositório.

---

**Universidade Federal do Ceará (UFC)**  
Desenvolvido para a Olimpíada Brasileira de Informática (OBI)
