# Etapa 1: build
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante
COPY . .

# Expõe a porta da API
EXPOSE 3001

# Comando de inicialização
CMD ["npm", "run", "dev"]