import { describe, expect, it } from 'vitest';
import { getAgentsData } from '@/api/mocks/agents';
import { getIssuesData } from '@/api/mocks/issues';
import { getProjectsData } from '@/api/mocks/projects';

describe('mock seed data', () => {
  it('includes required lab agents', () => {
    const agents = getAgentsData();
    const names = agents.map((a) => a.name);
    expect(names).toContain('Multica Helper');
    expect(names).toContain('Backend Engineer');
    expect(names).toContain('Bohan');
  });

  it('includes Web project with in_progress status', () => {
    const web = getProjectsData().find((p) => p.name === 'Web');
    expect(web).toBeDefined();
    expect(web?.status).toBe('in_progress');
  });

  it('includes Backend Squad and at least 8 issues', () => {
    const issues = getIssuesData();
    expect(issues.length).toBeGreaterThanOrEqual(8);
    const squads = issues.filter((i) => i.assignee.name === 'Backend Squad');
    expect(squads.length).toBeGreaterThan(0);
  });
});
