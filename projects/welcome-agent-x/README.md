# Welcome Agent X

Hello-world Multica lab project — greets every workspace agent by name and role.

| Asset | Path | Stack |
| --- | --- | --- |
| Frontend | `web/` | React SPA (Vite) |
| Backend | `api/` | Node.js + Express |

## Run locally

Requirements: Node.js 20+, pnpm 9+ (from repo root).

```bash
pnpm install
pnpm dev:welcome-agent-x:api   # http://localhost:3001
pnpm dev:welcome-agent-x:web   # http://localhost:5173
```

### Smoke checks

```bash
curl -s http://localhost:3001/api/health
curl -s http://localhost:3001/api/agents
```

Expect `{ "ok": true, ... }` from health and eight agents (name + role) from agents.

Then open the SPA and verify:

1. Hero: **Welcome Agent X** + headline + support + **Meet the team**
2. Gallery lists all eight agents from the API
3. Selecting an agent shows a personalized greeting
4. Specialty filter and API error/empty states behave as documented in `web/README.md`

See `api/README.md` and `web/README.md` for package-level details.
