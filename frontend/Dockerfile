#node image
FROM node:18-alpine AS base

RUN mkdir /home/node/frontend 

RUN npm install -g next 

FROM base AS dependencies

WORKDIR /home/node/frontend

COPY package*.json ./

RUN npm install

FROM dependencies as build

WORKDIR /home/node/frontend

COPY . .

RUN npm run build

FROM dependencies as prod

WORKDIR /home/node/frontend

EXPOSE 3000

CMD ["npm", "run", "start"]


