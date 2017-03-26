FROM node:7

VOLUME /app
WORKDIR /app
ADD package.json /app

RUN npm config set python python2.7
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
