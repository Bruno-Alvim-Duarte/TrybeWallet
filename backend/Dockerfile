FROM node:16.14.2

WORKDIR /app

COPY package*.json ./

COPY ./src/db/createDB.sql ./

RUN npm install

CMD [ "/bin/bash" ]