FROM node:18-alpine

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm ci

RUN npm run build
