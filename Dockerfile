FROM public.ecr.aws/docker/library/node:18-alpine as base
WORKDIR /app

FROM base as build
RUN apk add --no-cache --update coreutils bash libxml2-utils python3 make gcc g++
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
RUN npm prune --omit=dev

FROM base
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
COPY . ./
COPY --from=build /app/lib ./lib/
COPY --from=build /app/node_modules ./node_modules/
USER nodejs
ENTRYPOINT ["node", "-r", "./lib/dd-trace", "./bin/datadog-report-tool.js"]
