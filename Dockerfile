# Module-federation shell (host). Runs `ng serve` (dev server), not a production
# build. Open http://<host>:4200; it loads the remote from $MFE_REMOTE_URL in the browser.
FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies against the lockfile first for layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# App source (node_modules / .angular excluded via .dockerignore).
COPY . .
RUN chmod +x docker-entrypoint.sh

# Browser-facing URLs. Both are overridden by compose.
ENV API_URL=http://localhost:5038/api \
    MFE_REMOTE_URL=http://localhost:4300/remoteEntry.js \
    NODE_OPTIONS=--max-old-space-size=4096

EXPOSE 4200
ENTRYPOINT ["./docker-entrypoint.sh"]
