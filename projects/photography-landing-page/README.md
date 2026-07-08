# Photography Landing Page

Multica project folder for **Photography Landing Page** — premium Arabic RTL photography business landing site with contact form, Telegram notifications, and admin inquiries.

| Asset | Path | Stack |
| --- | --- | --- |
| Frontend | `web/` | React 19 + Vite + Tailwind |
| Backend | `api/` | Node.js + Express |

From repo root:

```bash
pnpm install
pnpm dev:photography-landing-page:web
pnpm dev:photography-landing-page:api
```

See `web/README.md` and `api/README.md` for package-level details.

## Scaffold notes

- Shell is Arabic RTL (`dir="rtl"` / `lang="ar"`) with design tokens from JEN-8 §5.1 (Option A).
- Placeholders follow BA assumptions A-01–A-05 until Q1–Q7 on JEN-7 are resolved.
- Full landing sections, form, Telegram, and admin land in later stage issues — this folder is the skeleton only.
