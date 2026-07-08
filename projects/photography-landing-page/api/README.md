# API

Node.js backend scaffold for **Photography Landing Page**.

## Setup

Requirements: Node.js 20+, pnpm 9+ (from repo root)

```bash
cp .env.example .env   # fill TELEGRAM_* when ready
pnpm install
pnpm --filter @photography-landing-page/api dev
# or from repo root:
pnpm dev:photography-landing-page:api
```

Default port: `3002` (3001 is used by jenan-lab-hub).

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | no | Listen port (default `3002`) |
| `TELEGRAM_BOT_TOKEN` | for notifications | Bot token — never expose to the frontend |
| `TELEGRAM_CHAT_ID` | for notifications | Destination chat for inquiry alerts |

See `.env.example`.

## Endpoints (scaffold)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness; reports whether Telegram env vars are set |

Inquiry POST, DB persistence, Telegram send, and admin auth land in JEN-11.
