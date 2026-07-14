# API

Node.js backend for **Welcome Agent X**.

## Setup

Requirements: Node.js 20+, pnpm 9+ (from repo root)

```bash
pnpm install
pnpm dev:welcome-agent-x:api
```

Or from this package:

```bash
pnpm install
pnpm dev
```

Default port: `3001` (override with `PORT`)

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Liveness check — `{ "ok": true }` |
| GET | `/api/agents` | Full agent roster (`id`, `name`, `role`, `status`) |

## Verify

```bash
curl -s http://localhost:3001/api/health
curl -s http://localhost:3001/api/agents
```

CORS is enabled for local SPA development (Vite default origin).
