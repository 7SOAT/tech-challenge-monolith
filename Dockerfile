#Build stage
FROM node:20-slim AS build

WORKDIR /tech-app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

#################################################################

#Production stage
#Instala imagem do Node.js
FROM node:20-slim AS production

#Cria um diretório app
WORKDIR /tech-app

#Cria uma cópia dos arquivos para dir criado
COPY package*.json ./

RUN npm install

COPY --from=build /tech-app/dist .

#Expõe porta
EXPOSE 3000

#Roda o script de build e start do servidor (duvida)
CMD ["node","main.js"]