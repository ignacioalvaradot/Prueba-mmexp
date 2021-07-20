FROM node:13.12.0-alpine

WORKDIR /usr/src/frontend

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN npm install

COPY . ./

EXPOSE 80

CMD ["npm", "start"]