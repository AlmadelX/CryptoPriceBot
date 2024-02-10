# syntax=docker/dockerfile:1
FROM node:18-alpine3.19 as build
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:18-alpine3.19 as production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production && npm cache clean --force
COPY --from=build /app/dist ./dist
CMD ["node", "dist/src/main.js"]
