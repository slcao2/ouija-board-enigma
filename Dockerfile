FROM node:18-alpine

WORKDIR /ouija-board-enigma
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD npm start