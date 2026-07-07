import type { Agent } from '@/types';

export const agentsMock: Agent[] = [
  {
    id: 'agent-1',
    name: 'Multica Helper',
    status: 'running',
    currentTask: 'Triage inbox issues for Web project',
    runtime: 'multica-runtime',
    lastActive: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    instructionsExcerpt:
      'Assist with Multica platform tasks, issue triage, and workspace configuration.',
    skills: ['multica-cli', 'issue-triage', 'agent-routing'],
    recentTasks: ['JEN-2: Configure workspace', 'JEN-3: Agent onboarding'],
    avatarInitials: 'MH',
  },
  {
    id: 'agent-2',
    name: 'Backend Engineer',
    status: 'running',
    currentTask: 'Build Jenan Lab Hub dashboard frontend',
    runtime: 'cursor-agent',
    lastActive: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    instructionsExcerpt:
      'Full-stack engineer for Web inbox and shared packages/core fixes.',
    skills: ['web-inbox-debug', 'react', 'node-backend'],
    recentTasks: ['JEN-4: Jenan Lab Hub', 'MUL-120: Inbox refetch fix'],
    avatarInitials: 'BE',
  },
  {
    id: 'agent-3',
    name: 'Bohan',
    status: 'idle',
    currentTask: null,
    runtime: 'cursor-agent',
    lastActive: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    instructionsExcerpt:
      'Code reviewer and quality gate for frontend PRs in the lab workspace.',
    skills: ['code-review', 'react', 'typescript'],
    recentTasks: ['Review JEN-1 scaffold', 'Review Web inbox PR'],
    avatarInitials: 'BO',
  },
  {
    id: 'agent-4',
    name: 'GPT-Boy',
    status: 'blocked',
    currentTask: 'Waiting on API credentials',
    runtime: 'multica-runtime',
    lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    instructionsExcerpt: 'General-purpose lab agent for experiments.',
    skills: ['general-purpose'],
    recentTasks: ['Spike: webhook integration'],
    avatarInitials: 'GB',
  },
];

export function resetAgentsMock(): Agent[] {
  return structuredClone(agentsMock);
}

let agentsData = structuredClone(agentsMock);

export function getAgentsData(): Agent[] {
  return agentsData;
}

export function setAgentsData(data: Agent[]): void {
  agentsData = data;
}

export function reseedAgents(): void {
  agentsData = resetAgentsMock();
}
