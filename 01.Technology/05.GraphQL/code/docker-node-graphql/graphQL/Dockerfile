FROM node:19.3.0-alpine3.17
WORKDIR /gql-server

COPY ./package.json .
COPY ./server.js .

RUN npm install

ENTRYPOINT [ "node", "index.js" ]