# syntax=docker/dockerfile:1.7

FROM oven/bun:alpine AS base
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    BUN_INSTALL_CACHE=/tmp/.bun-cache

FROM base AS deps
COPY package.json bun.lock* ./
RUN --mount=type=cache,target=/tmp/.bun-cache \
    bun install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,target=/tmp/.bun-cache \
    --mount=type=cache,target=/app/.next/cache \
    bun run build

FROM base AS runtime
COPY --from=build --chown=bun:bun /app/public ./public
COPY --from=build --chown=bun:bun /app/.next/standalone ./
COPY --from=build --chown=bun:bun /app/.next/static ./.next/static

USER bun
EXPOSE 3000
ENV HOSTNAME=0.0.0.0 \
    PORT=3000

CMD ["bun", "server.js"]