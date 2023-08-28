FROM node:18-alpine AS base

RUN mkdir /home/node/backend 

RUN npm install -g nodemon

RUN npm install -g ts-node

FROM base AS dependencies

WORKDIR /home/node/backend

COPY package*.json  ./

RUN npm install

FROM dependencies AS build

COPY . .

WORKDIR /home/node/backend

RUN npm run build

FROM dependencies AS prod


EXPOSE 3002

CMD ["node", "dist/app.js"]