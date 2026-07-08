# Welcome app — web

React SPA for the Welcome app: personalized owner greeting and Web Squad agent introductions.

## Setup

Requirements: Node.js 20+, [pnpm](https://pnpm.io/) 9+

From the monorepo root:

```bash
pnpm install
pnpm dev:welcome-app:api   # http://localhost:3002
pnpm dev:welcome-app:web   # http://localhost:5174
```

Or from this package:

```bash
pnpm install
pnpm --filter @welcome-app/api dev
pnpm dev
```

Vite proxies `/api` and `/health` to `http://localhost:3002`.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port **5174**) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Vitest |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — owner welcome hero + CTA |
| `/agents` | Roster — six Web Squad agents |
| `/agents/:id` | Agent detail — responsibilities + first-person greeting |

## Data

On load, the app fetches `GET /api/v1/content` (proxied to the Welcome API) and caches it with TanStack Query.
