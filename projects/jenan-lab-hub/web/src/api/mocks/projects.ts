import type { Project } from '@/types';

export const projectsMock: Project[] = [
  {
    id: 'proj-web',
    name: 'Web',
    description: 'Sandbox web app for Jenan-agentic-lab incident work.',
    status: 'in_progress',
    issueCount: 8,
    leadName: 'Saud',
    icon: 'globe',
  },
  {
    id: 'proj-infra',
    name: 'Infrastructure',
    description: 'Deployment, CI/CD, and runtime configuration.',
    status: 'planned',
    issueCount: 3,
    leadName: 'Mike',
    icon: 'server',
  },
  {
    id: 'proj-agents',
    name: 'Agent Platform',
    description: 'Agent definitions, squads, and autopilot experiments.',
    status: 'in_progress',
    issueCount: 5,
    leadName: 'Saud',
    icon: 'bot',
  },
  {
    id: 'proj-docs',
    name: 'Documentation',
    description: 'Lab guides, onboarding, and runbooks.',
    status: 'done',
    issueCount: 2,
    leadName: 'Sarah',
    icon: 'book',
  },
];

export function resetProjectsMock(): Project[] {
  return structuredClone(projectsMock);
}

let projectsData = structuredClone(projectsMock);

export function getProjectsData(): Project[] {
  return projectsData;
}

export function setProjectsData(data: Project[]): void {
  projectsData = data;
}

export function reseedProjects(): void {
  projectsData = resetProjectsMock();
}
