FROM node:7

RUN mkdir /app

VOLUME /app

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
