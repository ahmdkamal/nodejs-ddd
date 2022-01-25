FROM node:latest

RUN npm install -g nodemon

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "nodemon", "index.js" ]
