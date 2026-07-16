import type { Agent } from '@/types';

type AgentGreetingProps = {
  agent: Agent | null;
};

export function AgentGreeting({ agent }: AgentGreetingProps) {
  return (
    <div
      className="team__greeting"
      aria-live="polite"
      aria-atomic="true"
      data-testid="agent-greeting"
    >
      {agent ? (
        <>
          <p className="team__greeting-text" key={`hello-${agent.id}`}>
            Hello, {agent.name} — glad you’re here.
          </p>
          <p className="team__greeting-role" key={`role-${agent.id}`}>
            {agent.role}
          </p>
        </>
      ) : (
        <p className="team__greeting-idle">Select an agent to say hello.</p>
      )}
    </div>
  );
}
