# API

Node.js backend for **Welcome app**.

## Setup

Requirements: Node.js 20+, pnpm 9+ (from repo root)

```bash
pnpm install
pnpm dev:welcome-app:api
```

Default port: `3002` (hub API uses `3001`)

Override with `PORT`.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness check — `{ "ok": true }` |
| GET | `/api/v1/content` | Owner greeting + six Web Squad agent intros |

### `GET /api/v1/content` shape

```json
{
  "owner": { "name": "craftersaud", "title": "Project Owner" },
  "welcome": {
    "eyebrow": "Web Squad",
    "headline": "Welcome, craftersaud",
    "subheadline": "...",
    "ctaLabel": "Meet the Web Squad"
  },
  "agents": [
    {
      "id": "team-lead",
      "displayName": "Team Lead",
      "roleTitle": "...",
      "avatarInitials": "TL",
      "responsibilities": "...",
      "greeting": "..."
    }
  ]
}
```

Static JSON lives in `src/data/content.json` (BA greetings + UX §8 contract).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start with `tsx watch` |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run compiled `dist/index.js` |
| `pnpm test` | Vitest (health + content contract) |
