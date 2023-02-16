FROM node:alpine AS deps

WORKDIR /deps

COPY package.json package-lock.json ./

RUN npm ci

FROM node:alpine AS builder

COPY . .

COPY --from=deps /deps/node_modules ./node_modules

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=deps /deps/node_modules ./node_modules
COPY --from=builder /build ./build

CMD ["node", "build/index.js"]

