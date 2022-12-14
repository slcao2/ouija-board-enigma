FROM node:18

WORKDIR /ouija-board-enigma
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD npm run start:local
