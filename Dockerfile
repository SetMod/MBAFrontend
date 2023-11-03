FROM node:20.9.0-alpine3.18

RUN npm install -g http-server

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "http-server", "dist" ]
