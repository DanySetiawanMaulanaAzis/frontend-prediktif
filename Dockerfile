# Dev-server image for the module-federation shell. Not a production build -
# `ng serve` is what the ngx-build-plus / module-federation setup expects.
FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json* ./
# npm ci when the lockfile is in sync, otherwise fall back so a clone still boots.
RUN npm ci || npm install

COPY . .

EXPOSE 4200

# --host 0.0.0.0 so the published port is reachable; browser still uses localhost:4200.
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
