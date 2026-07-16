export type AgentStatus = 'idle' | 'working';

export type Agent = {
  id: string;
  name: string;
  role: string;
  status?: AgentStatus | null;
};

export type AgentsResponse = {
  agents: Agent[];
};
