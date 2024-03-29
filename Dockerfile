# ==================================================
# Deps-install Layer - only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ==================================================
# Build Layer - only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NOTION_INTEGRATION_TOKEN
ENV NOTION_INTEGRATION_TOKEN ${NOTION_INTEGRATION_TOKEN}

ARG NEXT_PUBLIC_NOTION_DB_ID
ENV NEXT_PUBLIC_NOTION_DB_ID ${NEXT_PUBLIC_NOTION_DB_ID}

RUN yarn build

# ==================================================
# Production Layer
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
