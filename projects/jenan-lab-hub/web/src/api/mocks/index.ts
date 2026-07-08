import { reseedActivity } from '@/api/mocks/activity';
import { reseedAgents } from '@/api/mocks/agents';
import { reseedIssues } from '@/api/mocks/issues';
import { reseedProjects } from '@/api/mocks/projects';

export function reseedAllMocks(): void {
  reseedAgents();
  reseedIssues();
  reseedProjects();
  reseedActivity();
}

export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateFetch<T>(data: T, ms?: number): Promise<T> {
  const delayMs = ms ?? 200 + Math.floor(Math.random() * 200);
  await delay(delayMs);
  return structuredClone(data);
}
