# Welcome Agent X

Hello-world Multica lab project — greets every workspace agent by name and role.

| Asset | Path | Stack |
| --- | --- | --- |
| Frontend | `web/` | React SPA (Stage 3 — Frontend Engineer) |
| Backend | `api/` | Node.js + Express |

## Run locally

Requirements: Node.js 20+, pnpm 9+ (from repo root).

```bash
pnpm install
pnpm dev:welcome-agent-x:api
```

Default API: `http://localhost:3001`

### Smoke checks

```bash
curl -s http://localhost:3001/api/health
curl -s http://localhost:3001/api/agents
```

Expect `{ "ok": true, ... }` from health and eight agents (name + role) from agents.

See `api/README.md` for package-level details. The React SPA lands in a later stage.
