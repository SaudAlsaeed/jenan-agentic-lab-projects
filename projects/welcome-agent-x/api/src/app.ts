import cors from "cors";
import express from "express";
import { agents } from "./agents.js";

const DEFAULT_CORS_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

export type CreateAppOptions = {
  /** Override CORS origin(s). Defaults to local Vite/dev SPA origins. */
  corsOrigin?: boolean | string | string[];
};

export function createApp(options: CreateAppOptions = {}) {
  const app = express();

  app.use(
    cors({
      origin: options.corsOrigin ?? DEFAULT_CORS_ORIGINS,
    }),
  );
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "welcome-agent-x-api" });
  });

  app.get("/api/agents", (_req, res) => {
    res.json({ agents });
  });

  return app;
}
