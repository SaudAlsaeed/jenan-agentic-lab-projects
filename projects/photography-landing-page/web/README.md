# Web

React SPA scaffold for **Photography Landing Page** (Arabic RTL).

## Setup

Requirements: Node.js 20+, [pnpm](https://pnpm.io/) 9+ (from repo root)

```bash
pnpm install
pnpm --filter @photography-landing-page/web dev
# or from repo root:
pnpm dev:photography-landing-page:web
```

Dev server: [http://localhost:5174](http://localhost:5174) (5174 so it can run alongside jenan-lab-hub on 5173).

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5174) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Vitest |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Scaffold contents

- `index.html` — `lang="ar"` `dir="rtl"`, Cairo / IBM Plex Sans Arabic / Readex Pro
- `src/styles/tokens.css` — JEN-8 §5.1 Option A design tokens (+ Option B comment)
- `src/pages/Shell.tsx` — minimal RTL shell with typographic wordmark placeholder

Landing sections, contact form, and admin UI are out of scope for this scaffold (later stage issues).
