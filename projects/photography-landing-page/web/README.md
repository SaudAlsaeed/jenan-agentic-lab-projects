# Web

React SPA for **Photography Landing Page** — Arabic RTL (default) + English LTR bilingual landing with contact form.

## Setup

Requirements: Node.js 20+, [pnpm](https://pnpm.io/) 9+

```bash
pnpm install
pnpm --filter @photography-landing-page/web dev
# or from repo root:
pnpm dev:photography-landing-page:web
```

Dev server: [http://localhost:5174](http://localhost:5174)

## Env (optional)

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE` | `http://localhost:3002` | Backend origin for `POST /api/inquiries` |
| `VITE_WHATSAPP_NUMBER` | `966500000000` | WhatsApp deep-link digits (placeholder) |
| `VITE_PHONE_DISPLAY` | `+966 50 000 0000` | Footer phone display |

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5174) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Vitest |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Admin (JEN-12)

Routes (RTL Arabic, JWT against API on `:3002`):

| Route | Purpose |
| --- | --- |
| `/admin/login` | Admin login |
| `/admin` | Inquiry list + filters/search |
| `/admin/inquiries/:id` | Detail: status, notes, Call / WhatsApp |

Default bootstrap credentials match the API (`admin` / `changeme`) unless overridden via API env.

## Scope

Public landing (JEN-10) + admin dashboard (JEN-12) in the same SPA.
