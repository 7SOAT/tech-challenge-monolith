#Instala imagem do Node.js
FROM node:20-slim

#Cria um diretório app
WORKDIR /tech-app

#Cria uma cópia dos arquivos para dir criado
COPY package.json package-lock.json tsconfig.json ./
COPY /.env ./

#Copia tudo dentro da pasta src para o diretório criado dentro de /src
COPY ./dist .

#Instala os pacotes
RUN npm install

#Expõe a porta para conexão
#EXPOSE 5432

#Roda o script de build e start do servidor (duvida)
CMD ["npm," "run", "start"]