#Primeiro estágio (app)
#Instala imagem do Node.js
FROM node:20-slim AS build

#Cria um diretório app
WORKDIR /tech-app

#Cria uma cópia dos arquivos para dir criado
COPY package.json package-lock.json tsconfig.json ./

#Copia tudo dentro da pasta src para o diretório criado dentro de /src
COPY ./dist .

#Instala os pacotes
RUN npm install

#Roda o script de build e start do servidor (duvida)
RUN npm run build

#Segundo estágio (db)
#Instala imagem do postgres
FROM postgres:16-alpine

#Váriaveis de ambiente
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=secretuser
ENV POSTGRES_PASSWORD=passwordmostsecret

#Cópia de entry point pré setado
COPY init.sql /docker-entrypoint-initdb.d/

COPY --from=build /app /app