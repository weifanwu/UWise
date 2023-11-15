FROM node:latest

COPY front-end-web /app/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]