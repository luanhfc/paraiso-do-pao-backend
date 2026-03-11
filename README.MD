# Paraíso do Pão — Backend

API REST para o cardápio online da padaria Paraíso do Pão.

## Tecnologias
- Node.js
- Express
- MongoDB Atlas
- Mongoose

## Como rodar localmente

1. Clone o repositório
2. Instale as dependências:
   npm install

3. Crie um arquivo .env na raiz com:
   MONGODB_URI=sua_connection_string_aqui
   PORT=3000

4. Rode o servidor:
   node server.js

## Endpoints

### Produtos
- GET /api/produtos — lista todos os produtos
- GET /api/produtos/categoria/:categoria — filtra por categoria (paes, bolos, salgados)
- POST /api/produtos — cadastra novo produto
- DELETE /api/produtos/:id — remove produto

### Pedidos
- GET /api/pedidos — lista todos os pedidos
- POST /api/pedidos — cria novo pedido
- PATCH /api/pedidos/:id/status — atualiza status do pedido

## Arquitetura do Sistema

![Diagrama de Caso de Uso](./diagrama.png)

### Camadas da aplicação
- **Routes** — recebe as requisições HTTP e repassa para os Services
- **Services** — contém todas as regras de negócio
- **Models** — define a estrutura dos dados e acessa o MongoDB