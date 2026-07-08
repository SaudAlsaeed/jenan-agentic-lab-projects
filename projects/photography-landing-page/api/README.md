# API

Node.js backend for **Photography Landing Page** (JEN-11).

## Setup

Requirements: Node.js 20+, pnpm 9+ (from repo root)

```bash
cp .env.example .env   # fill TELEGRAM_* and ADMIN_*
pnpm install
pnpm --filter @photography-landing-page/api dev
# or from repo root:
pnpm dev:photography-landing-page:api
```

Default port: `3002`.

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | no | Listen port (default `3002`) |
| `DATABASE_PATH` | no | SQLite file path (default `./data/inquiries.sqlite`) |
| `TELEGRAM_BOT_TOKEN` | for public inquiries | Bot token — never expose to the frontend |
| `TELEGRAM_CHAT_ID` | for public inquiries | Destination chat for inquiry alerts |
| `ADMIN_JWT_SECRET` | yes in production | HMAC secret for admin JWTs |
| `ADMIN_USERNAME` | no | Bootstrapped admin username (default `admin`) |
| `ADMIN_PASSWORD` | no | Bootstrapped admin password (default `changeme`) |
| `ADMIN_TOKEN_TTL` | no | JWT lifetime (default `8h`) |
| `CORS_ORIGIN` | no | Allowed origin; omit for permissive dev CORS |

## Auth choice

**JWT Bearer tokens** for admin routes (not sessions/cookies).

1. `POST /api/admin/login` with `{ username, password }` → `{ token }`
2. Send `Authorization: Bearer <token>` on `/api/admin/*`

On first boot the API creates the admin user from `ADMIN_USERNAME` / `ADMIN_PASSWORD` if missing.

## Telegram failure behavior

Inquiry is **saved first** with `telegramSent: false`, then Telegram is called. If Telegram fails, the API returns **502**, logs the failure, and leaves the row in DB so admin can still follow up. Successful notify flips `telegramSent` to `true`.

## Endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | no | Liveness + Telegram configured flag |
| POST | `/api/inquiries` | no (rate limited) | Create inquiry → DB + Telegram |
| POST | `/api/admin/login` | no | Issue JWT |
| GET | `/api/admin/me` | JWT | Current admin |
| GET | `/api/admin/inquiries` | JWT | List (newest first); query: `status`, `service`, `dateFrom`, `dateTo`, `q` |
| GET | `/api/admin/inquiries/:id` | JWT | Detail |
| PATCH | `/api/admin/inquiries/:id/status` | JWT | Status workflow |
| PATCH | `/api/admin/inquiries/:id/notes` | JWT | Internal notes |

### Public inquiry body

```json
{
  "name": "محمد",
  "phone": "0501234567",
  "email": "optional@example.com",
  "service": "weddings_events",
  "date": "2026-09-10",
  "preferredTime": "evening",
  "location": "Riyadh",
  "details": "..."
}
```

Required: `name`, `phone`, `service`.

`service` enum: `weddings_events` | `video` | `portraits` | `products` | `other`

Status workflow: `جديد` → `تم التواصل` → `مؤكد` → `مكتمل` → `ملغي`

## Confirmed business context (parent JEN-6)

- وكالة محمد السعيد للتصوير الإحترافي / Mohammed Alsaeed Agency for Professional Photography
- City: Riyadh
- Services focus: weddings/events, video, portraits
- Bilingual AR default (API field values are language-neutral enums + AR status labels)

## Tests

```bash
pnpm --filter @photography-landing-page/api test
```
