# API

Node.js backend for **Jenan Lab Hub**.

## Setup

Requirements: Node.js 20+, pnpm 9+ (from repo root)

```bash
pnpm install
pnpm dev:api
```

Default port: `3001`

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness check |
| GET | `/api/v1/overview` | Placeholder overview stats (swap for Multica API proxy in v2) |

## v2

Replace placeholder routes with authenticated Multica API integration or a BFF layer for the web app.
