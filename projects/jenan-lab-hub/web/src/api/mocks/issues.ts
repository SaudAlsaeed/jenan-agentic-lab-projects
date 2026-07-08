import type { Issue } from '@/types';

export const issuesMock: Issue[] = [
  {
    id: 'issue-1',
    identifier: 'JEN-4',
    title: 'Build Jenan Lab Hub team dashboard frontend in web/',
    description:
      '## Overview\n\nGreenfield build of the Jenan Lab Hub — a team command center with overview, agents, projects, issues kanban, and settings.\n\n### Acceptance\n- All 5 routes render\n- Mock data with real agent names\n- Dark mode persists',
    status: 'in_progress',
    priority: 'high',
    assignee: { type: 'squad', name: 'Backend Squad' },
    projectId: 'proj-web',
    columnOrder: 0,
  },
  {
    id: 'issue-2',
    identifier: 'JEN-3',
    title: 'Onboard lab agents and squads',
    description: 'Configure agent roster and squad assignments for the lab workspace.',
    status: 'done',
    priority: 'medium',
    assignee: { type: 'agent', name: 'Multica Helper' },
    projectId: 'proj-agents',
    columnOrder: 0,
  },
  {
    id: 'issue-3',
    identifier: 'JEN-2',
    title: 'Bind github repo to Web project',
    description: 'Attach jenan-agentic-lab-projects as github_repo resource.',
    status: 'done',
    priority: 'low',
    assignee: { type: 'agent', name: 'Multica Helper' },
    projectId: 'proj-web',
    columnOrder: 1,
  },
  {
    id: 'issue-4',
    identifier: 'JEN-5',
    title: 'Design system tokens for lab apps',
    description: 'Define shared color, typography, and spacing tokens.',
    status: 'todo',
    priority: 'medium',
    assignee: { type: 'agent', name: 'Bohan' },
    projectId: 'proj-web',
    columnOrder: 0,
  },
  {
    id: 'issue-5',
    identifier: 'JEN-6',
    title: 'Wire Multica API in v2',
    description: 'Replace mock fetchers with real Multica API client.',
    status: 'backlog',
    priority: 'high',
    assignee: { type: 'squad', name: 'Backend Squad' },
    projectId: 'proj-web',
    columnOrder: 0,
  },
  {
    id: 'issue-6',
    identifier: 'JEN-7',
    title: 'Set up staging deployment',
    description: 'Deploy web app to a staging environment for review.',
    status: 'backlog',
    priority: 'medium',
    assignee: { type: 'agent', name: 'Mike' },
    projectId: 'proj-infra',
    columnOrder: 1,
  },
  {
    id: 'issue-7',
    identifier: 'JEN-8',
    title: 'Review Jenan Lab Hub PR',
    description: 'Code review for the dashboard frontend before merge.',
    status: 'in_review',
    priority: 'high',
    assignee: { type: 'agent', name: 'Bohan' },
    projectId: 'proj-web',
    columnOrder: 0,
  },
  {
    id: 'issue-8',
    identifier: 'JEN-9',
    title: 'Write lab onboarding guide',
    description: 'Document how new teammates use the lab workspace.',
    status: 'todo',
    priority: 'low',
    assignee: { type: 'agent', name: 'Sarah' },
    projectId: 'proj-docs',
    columnOrder: 1,
  },
  {
    id: 'issue-9',
    identifier: 'JEN-10',
    title: 'Inbox performance spike',
    description: 'Investigate React Query refetch patterns in web inbox.',
    status: 'in_progress',
    priority: 'urgent',
    assignee: { type: 'agent', name: 'Backend Engineer' },
    projectId: 'proj-web',
    columnOrder: 1,
  },
];

export function resetIssuesMock(): Issue[] {
  return structuredClone(issuesMock);
}

let issuesData = structuredClone(issuesMock);

export function getIssuesData(): Issue[] {
  return issuesData;
}

export function setIssuesData(data: Issue[]): void {
  issuesData = data;
}

export function reseedIssues(): void {
  issuesData = resetIssuesMock();
}
