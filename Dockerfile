FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]