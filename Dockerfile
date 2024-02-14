FROM node:19 as build-vite
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "/bin/sh", "-c" , "node build" ]
