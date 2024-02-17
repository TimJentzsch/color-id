FROM node:20

# <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#labelling-container-images>
LABEL org.opencontainers.image.source=https://github.com/TimJentzsch/color-id

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
