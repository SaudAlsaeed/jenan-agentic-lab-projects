import { AgentRow } from '@/components/AgentRow';
import type { Agent } from '@/types';

type AgentListProps = {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (agent: Agent) => void;
};

export function AgentList({ agents, selectedId, onSelect }: AgentListProps) {
  return (
    <ul
      className="agent-list"
      role="listbox"
      aria-label="Workspace agents"
      data-testid="agent-list"
    >
      {agents.map((agent) => (
        <AgentRow
          key={agent.id}
          agent={agent}
          selected={agent.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
