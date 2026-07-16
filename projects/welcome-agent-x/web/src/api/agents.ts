import { API_BASE } from '@/config';
import type { Agent, AgentsResponse } from '@/types';

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/api/agents`);
  if (!res.ok) {
    throw new Error(`Failed to load agents (${res.status})`);
  }
  const data = (await res.json()) as AgentsResponse;
  if (!data || !Array.isArray(data.agents)) {
    throw new Error('Invalid agents response');
  }
  return data.agents;
}
