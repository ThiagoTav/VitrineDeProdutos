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
* Entrar com Usuario: `admin`
* Senha: `1234`
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

## Decisões Técnicas

Este projeto foi desenvolvido como parte de um desafio técnico para criar uma vitrine de produtos fullstack, com as seguintes exigências:

* Frontend com **Next.js**
* Backend com **Node.js + Express**
* Responsividade, SSR ou SSG, organização de código e boas práticas
* Diferenciais como uso de Docker, banco de dados, autenticação fake e testes

Abaixo, explico a escolha e a implementação de cada tecnologia, bem como as decisões de arquitetura.

---

### 🛠 **Frontend - Next.js (App Router)**

* **Framework escolhido**: Next.js com TypeScript, App Router e TailwindCSS, por ser moderno e escalável.
* **SSR**: Utilizei Server Side Rendering na rota de detalhes do produto (`/produto/[id]`) usando `fetch` direto com `export const revalidate = 60`, atendendo ao critério do desafio.
* **Head**: Implementado componente `HeadMeta.tsx` com uso de `next/head` para definir dinâmicamente título e descrição de cada página.
* **Responsividade**: Feita com TailwindCSS e grid responsivo adaptando para mobile e desktop.
* **Componentização**: Separados os componentes como `ProdutoCard.tsx` para reuso e melhor legibilidade.
* **Organização**:

  * `app/`: organização das páginas por rota
  * `types/`: centraliza interfaces como `Produto`
  * `components/`: elementos reutilizáveis da UI

### 🚀 **Backend - Node.js com Express + TypeScript**

* **Framework**: Express com TypeScript, usando estrutura MVC:

  * `routes/`: define endpoints REST (`/produtos`, `/produtos/:id`)
  * `controllers/`: controla lógica de resposta e tratamento de erros
  * `services/`: abstrai operações de dados (em memória ou no MongoDB)
* **Boas práticas**:

  * Validações básicas de ID
  * Separando responsabilidades por camada
  * Retornando `404` e `401` apropriadamente
* **Sessão**:

  * Simulação de login fake com `express-session` e `cookie-parser`
  * Usuário loga em `/login` e acessa rotas autenticadas
  * Se não autenticado, é redirecionado do frontend

### 📁 **Banco de Dados - MongoDB**

* **Escolha**: MongoDB local via Docker
* **ORM**: Uso do Mongoose para definir schemas (modelo Produto)
* **Persistência**: Substitui os produtos mockados por persistência real via MongoDB
* **População inicial**:

  * Script `seed.js` populando dados ao subir o container
  * Automático com `docker-compose up --build`

### 🚧 **Docker**

* **Objetivo**: Facilitar execução local e garantir o mesmo ambiente
* **Arquivos criados**:

  * `Dockerfile` para backend e frontend
  * `docker-compose.yml` com os 3 containers (frontend, backend, mongo)
* **Volumes e redes**:

  * Volume persistente para banco (`mongodb_data`)
  * Nome da rede e dependências para garantir ordem correta de subida
* **Scripts**:

  * No backend, script `seed.js` é executado após build para popular dados

### 🤑 **Autenticação Fake**

* Implementado login fake via `POST /login` com dados fixos
* Sessão é mantida via cookies com `express-session`
* Frontend redireciona para `/login` caso receba `401`

### 🌐 **Outras Decisões**

* Variáveis de ambiente centralizadas em `.env` com `.env.example` para compartilhar
* Usado `use client` apenas onde há hooks no frontend (ex: redirecionamento no detalhe)
* Testes adicionados com Jest para controllers do backend
* Projeto publicado em repositório público com README detalhado

## Autor

Thiago Tavares - [github.com/ThiagoTav](https://github.com/ThiagoTav)

---

## Licença

MIT