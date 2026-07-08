import cors from "cors";
import express from "express";
import content from "./data/content.json" with { type: "json" };

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "welcome-app-api" });
  });

  app.get("/api/v1/content", (_req, res) => {
    res.json(content);
  });

  return app;
}
