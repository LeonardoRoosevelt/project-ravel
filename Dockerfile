# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ] 