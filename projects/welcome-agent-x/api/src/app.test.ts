import { describe, expect, it } from "vitest";
import request from "supertest";
import { agents } from "./agents.js";
import { createApp } from "./app.js";

describe("Welcome Agent X API", () => {
  const app = createApp();

  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      service: "welcome-agent-x-api",
    });
  });

  it("GET /api/agents returns all eight agents with name and role", async () => {
    const res = await request(app).get("/api/agents");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.agents)).toBe(true);
    expect(res.body.agents).toHaveLength(8);
    expect(res.body.agents).toEqual(agents);

    for (const agent of res.body.agents) {
      expect(agent).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          status: expect.stringMatching(/^(idle|working)$/),
        }),
      );
      expect(agent.name.length).toBeGreaterThan(0);
      expect(agent.role.length).toBeGreaterThan(0);
    }

    const names = res.body.agents.map((a: { name: string }) => a.name);
    expect(names).toEqual([
      "Multica Helper",
      "Team Lead",
      "Business Analyst",
      "UX / UI Designer",
      "Frontend Engineer",
      "Backend Engineer",
      "QA Engineer",
      "Security Engineer",
    ]);
  });
});
