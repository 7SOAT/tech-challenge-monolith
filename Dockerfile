FROM node:20-slim AS base

WORKDIR /app

COPY package*.json ./

FROM base AS development

RUN npm install

COPY . .

RUN npm run build

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm ci --only=production

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
