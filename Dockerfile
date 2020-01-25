FROM node:12-alpine

ARG NODE_ENV=development

ENV NODE_ENV $NODE_ENV
ENV PORT 9091

EXPOSE 9091

WORKDIR /usr/car-pooling-challenge
COPY package.json .
RUN npm install --silent --production
COPY . .

ENTRYPOINT [ "sh", "start.sh" ]
