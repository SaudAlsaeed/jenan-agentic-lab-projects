# Welcome app

Multica project folder for **Welcome app** — owner greeting and Web Squad agent introductions.

| Asset | Path | Stack |
| --- | --- | --- |
| Frontend | `web/` | React 19 + Vite + Tailwind (Frontend Engineer) |
| Backend | `api/` | Node.js + Express |

From repo root:

```bash
pnpm install
pnpm dev:welcome-app:api   # http://localhost:3002
pnpm dev:welcome-app:web   # http://localhost:5174 (once web is scaffolded)
```

## API (backend)

- `GET /health` → `{ "ok": true }`
- `GET /api/v1/content` → owner + welcome + six agents (static JSON)

See `api/README.md` for details.

## Web (frontend)

Scaffolded by Frontend Engineer per UX spec (routes `/`, `/agents`, `/agents/:id`).
See `web/README.md` once present.
