# Welcome app

Multica project folder for **Welcome app** — owner greeting and Web Squad agent introductions.

| Asset | Path | Stack |
| --- | --- | --- |
| Frontend | `web/` | React 19 + Vite + Tailwind |
| Backend | `api/` | Node.js + Express |

From repo root:

```bash
pnpm install
pnpm dev:welcome-app:api   # http://localhost:3002
pnpm dev:welcome-app:web   # http://localhost:5174
```

Vite (web) proxies `/api` and `/health` to the API on port 3002.

## API (backend)

- `GET /health` → `{ "ok": true }`
- `GET /api/v1/content` → owner + welcome + six agents (static JSON)

See `api/README.md` for details.

## Web (frontend)

Routes: `/`, `/agents`, `/agents/:id` — see `web/README.md`.
