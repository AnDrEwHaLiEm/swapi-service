FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn
RUN yarn global add db-migrate db-migrate-pg


COPY . .

EXPOSE 3000

RUN yarn build

ENV PORT=3000 POSTGRES_HOST=db POSTGRES_DB=SWAPI POSTGRES_USER=Admin POSTGRES_PASSWORD=Admin POSTGRES_PORT=5432 REDIS_HOST=redis REDIS_PORT=6379 

CMD ["yarn","start"]