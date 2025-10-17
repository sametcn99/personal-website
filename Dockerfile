# Optimized Next.js + Bun Dockerfile
FROM oven/bun:1 AS base
ENV NODE_ENV=production BUN_INSTALL_CACHE=/tmp/.bun-cache
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN --mount=type=cache,target=/tmp/.bun-cache bun install --frozen-lockfile

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

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000

# Add health check using curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["bun", "server.js"]