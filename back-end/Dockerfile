# backend/Dockerfile

FROM node:18

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do código
COPY . .

# Define variável de ambiente para a porta (pode ser sobrescrita pelo docker-compose)
ENV PORT=3000

# Expõe a porta 3000 no container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]