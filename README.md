# jenan-agentic-lab-projects

Monorepo for all projects in the **Jenan-agentic-lab** Multica workspace.

**One repo, one folder per project.** Each Multica project maps to a subdirectory under `projects/`, and that folder holds all related assets (`web/`, `api/`, etc.).

## Layout

```
projects/
  jenan-lab-hub/       ← Multica project "Jenan Lab Hub"
    web/               React SPA dashboard
    api/               Node.js backend
  welcome-app/         ← Multica project "Welcome app"
    web/               React SPA (owner greeting + agent roster)
    api/               Node.js backend (static content JSON)
  <next-project>/      ← future Multica projects go here
    web/
    api/
```

## Quick start

Requirements: Node.js 20+, [pnpm](https://pnpm.io/) 9+

```bash
pnpm install
pnpm dev:jenan-lab-hub:web   # http://localhost:5173
pnpm dev:jenan-lab-hub:api   # http://localhost:3001
pnpm dev:welcome-app:web     # http://localhost:5174
pnpm dev:welcome-app:api     # http://localhost:3002
pnpm test
pnpm build
```

## Multica

- **Workspace:** `Jenan-agentic-lab`
- **Repo:** `https://github.com/SaudAlsaeed/jenan-agentic-lab-projects`
- **Convention:** each Multica project → `projects/<slug>/`

When assigning issues, bind them to the matching Multica project. Agents check out this repo and work inside that project's folder.

## Adding a new project

1. Create the Multica project in the workspace (bind this same repo URL).
2. Add `projects/<slug>/` with `web/`, `api/`, or other asset folders.
3. Register packages in `pnpm-workspace.yaml` (already uses `projects/*/*`).
4. Add convenience scripts to root `package.json` if helpful.

## Local path

```
/Users/saudcenter/Projects/jenan-agentic-lab-projects
```
