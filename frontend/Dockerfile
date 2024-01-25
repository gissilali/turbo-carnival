FROM node:slim

ENV NODE_ENV development

WORKDIR /var/www

COPY . .

RUN npm install

CMD [ "node", "server.js" ]

EXPOSE 5000