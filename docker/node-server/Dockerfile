FROM node:18

RUN apt-get update

RUN yarn global add pm2

RUN mkdir /app
WORKDIR /app/server/

USER node
