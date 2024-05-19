FROM node:alpine

RUN mkdir -p /usr/src/betabuzz-api && chown -R node:node /usr/src/betabuzz-api

WORKDIR /usr/src/betabuzz-api

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
