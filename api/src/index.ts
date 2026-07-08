import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "jenan-lab-hub-api" });
});

app.get("/api/v1/overview", (_req, res) => {
  res.json({
    workspace: "Jenan-agentic-lab",
    projects: 1,
    agents: 3,
    openIssues: 9,
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
