FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3000

USER node
CMD [ "npm", "run", "start:dev"]
