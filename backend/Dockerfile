FROM node:13.12.0-alpine

WORKDIR /usr/src/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
