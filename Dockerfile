# Optimized Next.js + Bun Dockerfile
FROM oven/bun:1 AS base
ENV NODE_ENV=production BUN_INSTALL_CACHE=/tmp/.bun-cache
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN --mount=type=cache,target=/tmp/.bun-cache bun install --frozen-lockfile --production=false

# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Runtime
FROM base AS runtime
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD ["bun", "-e", "fetch('http://localhost:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["bun", "server.js"]