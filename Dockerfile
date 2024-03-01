FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn
RUN yarn global add db-migrate db-migrate-pg


COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
