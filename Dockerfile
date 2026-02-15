# syntax=docker/dockerfile:1.7

FROM oven/bun:1 AS base
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

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const p=process.env.PORT||'3000';const u=['http://127.0.0.1:'+p,'http://localhost:'+p];let ok=false;for(const x of u){try{const r=await fetch(x);if(r.ok){ok=true;break;}}catch{}}process.exit(ok?0:1)"

CMD ["bun", "server.js"]