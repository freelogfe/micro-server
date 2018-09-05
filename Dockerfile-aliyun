FROM daocloud.io/node:8.5-alpine

MAINTAINER daizch <daizech@gmail.com>

RUN mkdir -p /data/fe-micro-server

WORKDIR /data/fe-micro-server

COPY . /data/fe-micro-server

RUN npm install

ENV NODE_ENV prod
ENV EGG_SERVER_ENV prod
ENV PORT 9001

EXPOSE 9001

CMD [ "npm", "start" ]