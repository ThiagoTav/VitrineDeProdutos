# Projeto Fullstack Junior Test

Aplicacao fullstack com frontend em Next.js + Tailwind e backend em Node.js + Express + MongoDB.

---

## Tecnologias Utilizadas

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Fetch API com autenticação (cookie/session)

### Backend

* Node.js + Express
* TypeScript + ts-node-dev
* MongoDB (com Mongoose ODM)
* Script de população: `seed.js`

### DevOps

* Docker + Docker Compose
* `.env` e variáveis de ambiente

---

## Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/ThiagoTav/VitrineDeProdutos.git
cd VitrineDeProdutos
```

### 2. Renomear arquivos do front e back `.env.example` para `.env`

Renomeie o arquivo `.env.example` para `.env` dentro da pasta `/backend` e `/frontend`.

### 3. Subir com Docker Compose

```bash
docker-compose up --build
```

Isso irá:

* Subir o MongoDB na porta 27017
* Buildar o backend e frontend
* Rodar `seed.js` automaticamente no container do backend para popular o banco

### 4. Acessar

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:3001/produtos](http://localhost:3001/produtos)

---

## Estrutura das Pastas

```
.
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── controllers/
│   ├── seed.js           # Popula o banco com produtos
│   └── server.ts
├── frontend/
│   └── src/app/
│       ├── page.tsx          # Home
│       └── produto/[id]/     # Detalhes do produto
├── docker-compose.yml
└── README.md
```

---

## Funcionalidades

* Listagem de produtos
* Detalhes individuais
* Sessão com cookies (fake auth)
* Dados dinâmicos vindos da API

---

## Autor

Thiago Tavares - [github.com/ThiagoTav](https://github.com/ThiagoTav)

---

## Licença

MIT