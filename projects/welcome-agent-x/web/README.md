# Web

React SPA for **Welcome Agent X** (Vite + React). No Next.js.

## Setup

From the monorepo root:

```bash
pnpm install
pnpm dev:welcome-agent-x:api   # terminal 1 — http://localhost:3001
pnpm dev:welcome-agent-x:web   # terminal 2 — http://localhost:5173
```

Or from this package after root install:

```bash
pnpm dev
```

Override the API origin with `VITE_API_BASE` if needed (default `http://localhost:3001`).

## Verify

1. Open `http://localhost:5173`
2. Confirm the hero shows **Welcome Agent X**, headline, support line, and **Meet the team**
3. Scroll or click the CTA — the gallery should list all eight agents from `GET /api/agents`
4. Select an agent — greeting updates to `Hello, {name} — glad you’re here.` plus their role
5. Try the specialty filter (e.g. `frontend`, `qa`)

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5173) |
| `pnpm build` | Typecheck + production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Vitest unit/component tests |
