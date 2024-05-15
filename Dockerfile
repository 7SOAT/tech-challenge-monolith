#Instala imagem do Node.js
FROM node:20

#Cria um diretório app
#Todos os arquivos dentro do Docker container rodando no servidor
#estará em /usr/src/app
WORKDIR /tech-app

#Cria uma cópia de "package.json", "package-lock.json", "tsconfig.json", ".env"
#na raiz do diretório criado
COPY package.json package-lock.json tsconfig.json ./
COPY /.env /tech-app

#Copia tudo dentro da pasta src para o diretório criado dentro de /src
COPY ./dist .

#Instala os pacotes
RUN npm install

#Expõe a porta para conexão
EXPOSE 5432

#Roda o script de build e start do servidor (duvida)
CMD ["npm," "run", "start"]