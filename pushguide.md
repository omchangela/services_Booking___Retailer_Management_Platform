# 🚀 Full-Stack Docker & Production Deployment Guide
### For VPS Multi-Project Hosting (Next.js, Node.js/Express, Databases & Nginx)

This guide provides the complete architectural blueprint and step-by-step instructions for containerizing and deploying any full-stack web application on your VPS alongside other projects.

---

## 🏗️ 1. Architecture Overview

In a multi-project VPS environment (like `/opt/php-multi-version/`), multiple websites and microservices run simultaneously on a single server without port conflicts:

```mermaid
graph TD
    Client["🌐 Internet / Web Browsers"] -->|Port 80 / 443 / Custom Port| CentralNginx["Central Nginx Container<br/>(php-multi-version-nginx-1)"]
    
    subgraph "Docker Network: php-multi-version_default"
        CentralNginx -->|/api/*| BackendApp["Backend API Container<br/>(cb_backend:5000)"]
        CentralNginx -->|/*| FrontendApp["Next.js App Container<br/>(cb_frontend:3000)"]
    end

    subgraph "Isolated Project Network (cb_internal)"
        BackendApp --> Database["PostgreSQL / MySQL<br/>(cb_postgres:5432)"]
        BackendApp --> Cache["Redis Cache<br/>(cb_redis:6379)"]
    end
```

### Key Principles:
1. **Zero Host Port Clashes**: The database and redis containers do **not** bind ports to the VPS host (`0.0.0.0`). They communicate only through the internal project network (`cb_internal`).
2. **Same-Origin API Architecture**: By proxying `/api/` to the backend and `/` to Next.js under the exact same domain or port, you completely eliminate:
   - CORS errors
   - Cookie rejection across different domains
   - Browser private network loopback blocks (`net::ERR_FAILED` on `localhost`)

---

## 📦 2. Next.js Frontend Setup

### Step A: Configure Standalone Output
In your Next.js project root, edit `next.config.ts` (or `next.config.js`):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Shrinks Docker image from ~1.5GB to ~180MB
};

export default nextConfig;
```

### Step B: Create `.dockerignore`
Create `.dockerignore` in your Next.js folder:
```text
node_modules
.next
.git
.env*.local
*.log
```

### Step C: Use Relative API URLs
In your frontend API helper (e.g. `lib/api.ts` or `lib/auth.ts`):
```typescript
// ✅ CORRECT: Empty string uses relative paths (/api/...)
const BASE = process.env.NEXT_PUBLIC_API_URL || "";

// Example fetch:
fetch(`${BASE}/api/auth/login`, { ... });
```

### Step D: Production `Dockerfile` for Next.js
Create `Dockerfile` in your Next.js folder:

```dockerfile
# ── Stage 1: Dependencies ──
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# ── Stage 2: Builder ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# ── Stage 3: Minimal Production Runner ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

---

## ⚙️ 3. Backend (Node.js / Express / Prisma) Setup

### Step A: Create `Dockerfile`
In your backend project directory:

```dockerfile
FROM node:22-slim

WORKDIR /app

# Install system dependencies needed by Prisma & SSL
RUN apt-get update -y && apt-get install -y openssl ca-certificates fonts-freefont-ttf && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
```

### Step B: Create `docker-entrypoint.sh`
In your backend project directory:

```bash
#!/bin/sh
set -e

echo "Waiting for database to be ready..."
max_retries=30
count=0
until npx prisma db push --skip-generate; do
  count=$((count+1))
  if [ $count -ge $max_retries ]; then
    echo "Could not connect to database after $max_retries attempts, starting anyway..."
    break
  fi
  echo "Database connecting ($count/$max_retries)..."
  sleep 2
done

echo "Ensuring seed admin..."
node dist/scripts/seedAdmin.js 2>/dev/null || true

echo "Starting backend cluster..."
exec node dist/cluster.js
```
*(Make sure to run `chmod +x docker-entrypoint.sh`)*

---

## 🐳 4. Master `docker-compose.yml`

In the root of your project:

```yaml
services:
  # ── 1. Database ──
  project_db:
    image: postgres:16-alpine
    container_name: project_postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secure_db_pass_2026}
      POSTGRES_DB: ${POSTGRES_DB:-my_project_db}
    volumes:
      - project_postgres_data:/var/lib/postgresql/data
    networks:
      - project_internal
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # ── 2. Redis ──
  project_redis:
    image: redis:7-alpine
    container_name: project_redis
    restart: always
    volumes:
      - project_redis_data:/data
    networks:
      - project_internal
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  # ── 3. Backend API ──
  project_backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: project_backend
    restart: always
    depends_on:
      project_db:
        condition: service_healthy
      project_redis:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: 5000
      DATABASE_URL: postgresql://postgres:secure_db_pass_2026@project_db:5432/my_project_db?schema=public
      REDIS_URL: redis://project_redis:6379
      JWT_ACCESS_SECRET: ${JWT_ACCESS_SECRET:-random_secret_string}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET:-random_secret_string}
      CLIENT_URL: ${CLIENT_URL:-http://your-domain-or-ip}
    networks:
      - project_internal
      - php-multi-version_default

  # ── 4. Frontend (Next.js) ──
  project_frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: project_frontend
    restart: always
    depends_on:
      - project_backend
    environment:
      NODE_ENV: production
      PORT: 3000
      NEXT_PUBLIC_API_URL: ""
      INTERNAL_API_URL: http://project_backend:5000
    networks:
      - project_internal
      - php-multi-version_default

volumes:
  project_postgres_data:
  project_redis_data:

networks:
  project_internal:
    driver: bridge
  php-multi-version_default:
    external: true
```

---

## 🌐 5. Central Nginx Reverse Proxy Configuration

In `/opt/php-multi-version/nginx/` (e.g. `php82.conf` or a dedicated `<project>.conf`):

### Option A: Hosting with a Custom Domain (Port 80/443 with SSL)
```nginx
# HTTP -> HTTPS redirect
server {
    listen 80;
    server_name myapp.example.com;
    return 301 https://$host$request_uri;
}

# HTTPS Server Block
server {
    listen 443 ssl;
    server_name myapp.example.com;

    ssl_certificate /etc/ssl/myapp.example.com/fullchain.pem;
    ssl_certificate_key /etc/ssl/myapp.example.com/privkey.pem;

    client_max_body_size 50M;

    # Internal Docker resolver (prevents Nginx crashing if app restarts)
    resolver 127.0.0.11 valid=30s ipv6=off;
    set $backend_url http://project_backend:5000;
    set $frontend_url http://project_frontend:3000;

    location /api/ {
        proxy_pass $backend_url;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass $frontend_url;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Option B: Hosting on a Dedicated Port (e.g. 853 or 822)
```nginx
server {
    listen 853;
    server_name 201.18.210.181 localhost _;
    client_max_body_size 50M;

    resolver 127.0.0.11 valid=30s ipv6=off;
    set $backend_url http://project_backend:5000;
    set $frontend_url http://project_frontend:3000;

    location /api/ {
        proxy_pass $backend_url;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass $frontend_url;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> [!IMPORTANT]
> If using a new port on Nginx (e.g. `853`), make sure that port is listed under `ports:` in `/opt/php-multi-version/docker-compose.yml`, and allowed in your firewall (`ufw allow <port>/tcp`).

---

## 🔄 6. Upload & Deployment Workflow

### Step 1: Push to GitHub from Local Machine
```bash
git add -A
git commit -m "feat: new project feature"
git push origin main
```

### Step 2: Deploy on VPS
Connect to your VPS and run:
```bash
# Navigate to the project folder
cd /opt/php-multi-version/php82/<project_name>

# Pull latest code
git pull origin main

# Rebuild and start updated containers
docker compose up -d --build
```

### Step 3: Reload Nginx (if nginx configs changed)
```bash
docker exec $(docker ps -q -f name=nginx) nginx -t
docker exec $(docker ps -q -f name=nginx) nginx -s reload
```

---

## 🛠️ 7. Everyday Maintenance Cheat Sheet

| Task | Command |
| :--- | :--- |
| **Check container health** | `docker compose ps` |
| **View live logs (all)** | `docker compose logs -f` |
| **View live logs (backend)** | `docker compose logs -f project_backend` |
| **View live logs (frontend)** | `docker compose logs -f project_frontend` |
| **Restart stack** | `docker compose restart` |
| **Stop stack** | `docker compose down` |
| **Check Docker disk usage** | `docker system df` |
| **Clean unused images/cache** | `docker image prune -f` |
| **Backup PostgreSQL DB** | `docker exec -t project_postgres pg_dump -U postgres my_project_db > backup.sql` |
| **Restore PostgreSQL DB** | `cat backup.sql \| docker exec -i project_postgres psql -U postgres my_project_db` |

---

## 🇮🇳 8. SevaSetu Production Setup Summary (Live on Port 854)

This project (**SevaSetu Service Booking & Retailer Management Platform**) has been configured and deployed following the exact VPS architecture:

### 1. Live Access Information
* **Public URL**: `http://201.18.210.181:854/` (or `http://localhost:854/`)
* **Container Name**: `sevasetu_frontend`
* **Docker Network**: `php-multi-version_default`
* **Assigned Nginx Port**: `854` (bound via `php-multi-version-nginx-1`)

### 2. Files in Repository
* `Dockerfile`: Multi-stage build (`node:20-alpine` build ➔ `nginx:alpine` runtime).
* `nginx.conf`: In-container SPA routing (`try_files $uri $uri/ /index.html;`), Gzip, static asset caching.
* `docker-compose.yml`: Attached to `php-multi-version_default` external network with image `sevasetu_frontend:latest`.
* `.dockerignore`: Excludes `node_modules`, `dist`, `.git`, logs.

### 3. Central Reverse Proxy Configuration
Appended to `/opt/php-multi-version/nginx/php82.conf`:
```nginx
# ── SEVASETU CITIZEN SERVICES & RETAILER PLATFORM (Port 854) ──
server {
    listen 854;
    server_name 201.18.210.181 localhost _;
    client_max_body_size 50M;

    resolver 127.0.0.11 valid=30s ipv6=off;
    set $sevasetu_frontend http://sevasetu_frontend:80;

    location / {
        proxy_pass $sevasetu_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 4. Updating SevaSetu After Code Changes
```bash
# 1. Pull latest changes from GitHub
git pull origin main

# 2. Rebuild and restart the container
docker compose up -d --build

# 3. View live logs
docker compose logs -f sevasetu_frontend
```

