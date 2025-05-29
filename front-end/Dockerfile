# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expõe a porta 5173 do Vite
EXPOSE 5173

# Define variável de ambiente para Vite ouvir em 0.0.0.0
ENV VITE_HOST=0.0.0.0

# Comando para rodar o Vite no modo dev
CMD ["npm", "run", "dev"]
