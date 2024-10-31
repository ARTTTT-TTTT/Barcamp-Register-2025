FROM node:current-alpine3.16
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV DATABASE_URL mongodb://root:pupabarcamp7@mongo:27017
CMD node index.js
EXPOSE 3001
