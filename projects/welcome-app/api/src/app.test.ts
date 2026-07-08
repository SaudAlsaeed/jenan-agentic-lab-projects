import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import { createApp } from "./app.js";

const EXPECTED_AGENT_IDS = [
  "team-lead",
  "business-analyst",
  "ux-designer",
  "frontend-engineer",
  "backend-engineer",
  "qa-engineer",
] as const;

describe("welcome-app api", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = createApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, "127.0.0.1", () => resolve());
    });
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("expected TCP address");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("GET /health returns ok", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true });
  });

  it("GET /api/v1/content returns owner, welcome, and six agents", async () => {
    const res = await fetch(`${baseUrl}/api/v1/content`);
    expect(res.status).toBe(200);

    const body = (await res.json()) as {
      owner: { name: string; title: string };
      welcome: {
        eyebrow: string;
        headline: string;
        subheadline: string;
        ctaLabel: string;
      };
      agents: Array<{
        id: string;
        displayName: string;
        roleTitle: string;
        avatarInitials: string;
        responsibilities: string;
        greeting: string;
      }>;
    };

    expect(body.owner).toEqual({
      name: "craftersaud",
      title: "Project Owner",
    });
    expect(body.welcome.headline).toContain("craftersaud");
    expect(body.welcome.subheadline.toLowerCase()).toContain("owner");
    expect(body.agents).toHaveLength(6);
    expect(body.agents.map((a) => a.id)).toEqual([...EXPECTED_AGENT_IDS]);

    for (const agent of body.agents) {
      expect(agent.displayName.length).toBeGreaterThan(0);
      expect(agent.roleTitle.length).toBeGreaterThan(0);
      expect(agent.avatarInitials).toHaveLength(2);
      expect(agent.responsibilities.length).toBeGreaterThan(0);
      expect(agent.greeting).toMatch(/\bI\b/);
    }
  });
});
