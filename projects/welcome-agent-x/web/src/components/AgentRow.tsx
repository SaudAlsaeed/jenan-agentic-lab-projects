import type { Agent } from '@/types';

type AgentRowProps = {
  agent: Agent;
  selected: boolean;
  onSelect: (agent: Agent) => void;
};

function statusLabel(status: Agent['status']): string | null {
  if (status === 'idle' || status === 'working') return status;
  return null;
}

export function AgentRow({ agent, selected, onSelect }: AgentRowProps) {
  const status = statusLabel(agent.status);

  return (
    <li role="option" aria-selected={selected}>
      <button
        type="button"
        className={`agent-row${selected ? ' agent-row--selected' : ''}`}
        onClick={() => onSelect(agent)}
        onFocus={() => onSelect(agent)}
      >
        <span className="agent-row__name">{agent.name}</span>
        <span className="agent-row__role">{agent.role}</span>
        {status ? (
          <span className={`agent-row__status agent-row__status--${status}`}>
            {status}
          </span>
        ) : null}
      </button>
    </li>
  );
}
