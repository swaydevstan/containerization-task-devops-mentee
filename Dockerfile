FROM node:current-alpine3.16

WORKDIR /my-node-api

COPY package*.json /my-node-api/

RUN npm install

COPY . /my-node-api

EXPOSE 4000

CMD [ "npm", "start" ]