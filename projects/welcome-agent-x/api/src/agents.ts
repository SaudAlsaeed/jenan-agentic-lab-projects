export type AgentStatus = "idle" | "working";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
};

/** Static roster — single source of truth for Welcome Agent X (v1). */
export const agents: Agent[] = [
  {
    id: "multica-helper",
    name: "Multica Helper",
    role: "Multica usage assistant — help create/view tasks, configure agents, and navigate the workspace",
    status: "idle",
  },
  {
    id: "team-lead",
    name: "Team Lead",
    role: "Coordinates Web Squad delivery — triage, delegation, and unblock",
    status: "idle",
  },
  {
    id: "business-analyst",
    name: "Business Analyst",
    role: "Clarifies requirements and breaks work into actionable issues",
    status: "idle",
  },
  {
    id: "ux-ui-designer",
    name: "UX / UI Designer",
    role: "UX flows, visual design, wireframes, and design-to-dev specs",
    status: "idle",
  },
  {
    id: "frontend-engineer",
    name: "Frontend Engineer",
    role: "React.js frontend specialist for UI, components, and client-side behavior",
    status: "idle",
  },
  {
    id: "backend-engineer",
    name: "Backend Engineer",
    role: "Node.js backend specialist for APIs, server logic, and shared packages",
    status: "idle",
  },
  {
    id: "qa-engineer",
    name: "QA Engineer",
    role: "Validates web changes and produces structured test evidence",
    status: "idle",
  },
  {
    id: "security-engineer",
    name: "Security Engineer",
    role: "Application security specialist for PR review, secrets, auth, and input-validation risks",
    status: "idle",
  },
];
