FROM node:18-alpine

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install --silent

COPY . ./
