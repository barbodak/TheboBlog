FROM node:18.19.0 AS node-build

WORKDIR /usr/src/app

COPY front-bob/package*.json ./
RUN npm install

COPY front-bob/ .

RUN npm run build

ENTRYPOINT [ "/bin/sh", "-c" , "node build" ]
