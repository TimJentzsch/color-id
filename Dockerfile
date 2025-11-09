# Build step
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package*.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# Deployment step
FROM node:22-alpine
# <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#labelling-container-images>
LABEL org.opencontainers.image.source=https://github.com/TimJentzsch/color-id

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

COPY --from=build /app/build build/
COPY package.json pnpm-lock.yaml ./

# Use non-root user
RUN chown -R nodejs:nodejs .
USER nodejs

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
