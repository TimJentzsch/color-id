FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Launch app
CMD [ "node", "build" ]
