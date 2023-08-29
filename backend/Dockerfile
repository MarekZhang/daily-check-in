FROM node:18-alpine 

RUN mkdir /home/node/backend 

WORKDIR /home/node/backend

COPY package*.json  ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/app.js"]