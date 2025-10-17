# -----------------------------------------------------------------------------
# Optimized Dockerfile for Next.js + Bun project
# -----------------------------------------------------------------------------

# 1. Base image with common settings
FROM oven/bun:1 AS base

# Enable Bun's built-in optimizations
ENV BUN_RUNTIME=1 \
    BUN_INSTALL_CACHE=/tmp/.bun-install-cache \
    NODE_ENV=production

WORKDIR /app

# 2. Dependencies installation stage with caching
FROM base AS deps
# Copy only the files needed for installation
COPY package.json bun.lock* ./

# Use cache mounting to speed up installation
RUN --mount=type=cache,target=/tmp/.bun-install-cache \
    bun install --frozen-lockfile --no-save

# 3. Builder stage with optimized build settings
FROM base AS builder

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Copy node_modules with cache awareness
COPY --from=deps /app/node_modules ./node_modules

# Copy only the necessary source files first
COPY tsconfig.json next.config.ts ./
COPY src ./src
COPY public ./public

# Copy remaining config files
COPY . .

# Build with production optimizations
RUN BUN_SCOPE="true" bun run build

# 4. Runner stage with minimal footprint
FROM gcr.io/distroless/nodejs20-debian11 AS runner

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

# Copy only the necessary build outputs for running the application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create a non-root user
USER 1001

EXPOSE 3000

# Add healthcheck with optimized interval settings
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["node", "-e", "require('http').get('http://localhost:3000/api/health'||'http://localhost:3000/', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"]

# Use Node.js to run the Next.js standalone server
CMD ["bun", "server.js"]