FROM node:lts-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install --no-cache

COPY . ./

CMD [ "npm", "run", "dev"]