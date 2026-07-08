# Jenan Lab Hub

Team command center for the **Jenan-agentic-lab** workspace — a lightweight dashboard to monitor agents, projects, issues, and lab activity.

## Setup

Requirements: Node.js 20+, [pnpm](https://pnpm.io/) 9+

```bash
pnpm install
pnpm dev
```

Dev server runs at [http://localhost:5173](http://localhost:5173).

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server (port 5173) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Run Vitest test suite |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Architecture

```
src/
  api/
    client.ts      # TanStack Query hooks (swap fetcher for real API in v2)
    mocks/         # Seed data with simulated latency
  components/
    shell/         # AppLayout, Sidebar, TopBar
    ui/            # Button, Card, Badge, Modal, Drawer, Skeleton
  pages/           # Route-level views
  routes/          # React Router v7 config
  stores/          # Zustand UI preferences (theme, sidebar)
  styles/          # Tailwind v4 + CSS variables
  types/           # Shared TypeScript types
```

### Tech stack

- React 19 + Vite 6 + TypeScript (strict)
- React Router v7
- Tailwind CSS v4 with teal accent + dark mode
- TanStack Query v5 for server state
- Zustand for UI prefs (persisted to localStorage)
- Recharts for overview charts
- Vitest + React Testing Library

### Routes

| Path | Page |
| --- | --- |
| `/` | Overview — KPIs, charts, activity feed |
| `/agents` | Sortable agent table + detail drawer |
| `/projects` | Project cards with status filters |
| `/issues` | Kanban board with issue detail modal |
| `/settings` | Theme, sidebar density, reset demo data |

## v2 = wire Multica API

v1 uses mock data under `src/api/mocks/`. To integrate the real Multica API:

1. Replace fetch functions in `src/api/client.ts` with authenticated API calls
2. Keep the same hook signatures and query keys so pages stay unchanged
3. Remove or gate mock reseed logic in Settings

## Mock data

Seeded agents: **Multica Helper**, **Backend Engineer**, **Bohan**. Project **Web** is `in_progress`. Squad **Backend Squad** appears on assigned issues. 9 issues span all kanban columns.
