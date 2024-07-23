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

ENV POSTGRES_HOST=dpg-cqd4stmehbks73bpl570-a.oregon-postgres.render.com \
    POSTGRES_PORT=5432 \
    POSTGRES_DATABASE=fiaptech \
    POSTGRES_USER=secretuser \
    POSTGRES_PASSWORD=meZxka6zIaROJ1lJQ27jFEhGJVZE8tgv \
    API_PORT=3000

RUN npm ci --only=production

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
