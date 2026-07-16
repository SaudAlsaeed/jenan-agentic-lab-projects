import { useEffect, useMemo, useState } from 'react';
import { fetchAgents } from '@/api/agents';
import { AgentFilter } from '@/components/AgentFilter';
import { AgentGreeting } from '@/components/AgentGreeting';
import { AgentList } from '@/components/AgentList';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import type { Agent } from '@/types';

type LoadState = 'loading' | 'ready' | 'error';

function matchesFilter(agent: Agent, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    agent.name.toLowerCase().includes(needle) ||
    agent.role.toLowerCase().includes(needle)
  );
}

export function TeamSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');

    fetchAgents()
      .then((list) => {
        if (cancelled) return;
        setAgents(list);
        setLoadState('ready');
        setSelectedId((current) => {
          if (current && list.some((agent) => agent.id === current)) {
            return current;
          }
          return null;
        });
      })
      .catch(() => {
        if (cancelled) return;
        setAgents([]);
        setLoadState('error');
        setSelectedId(null);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const filtered = useMemo(
    () => agents.filter((agent) => matchesFilter(agent, filter)),
    [agents, filter],
  );

  const selected =
    filtered.find((agent) => agent.id === selectedId) ??
    agents.find((agent) => agent.id === selectedId) ??
    null;

  function handleSelect(agent: Agent) {
    setSelectedId(agent.id);
  }

  function renderRoster() {
    if (loadState === 'loading') {
      return (
        <p className="team-loading" role="status">
          Loading the team…
        </p>
      );
    }

    if (loadState === 'error') {
      return <ErrorState onRetry={() => setReloadKey((key) => key + 1)} />;
    }

    if (agents.length === 0) {
      return <EmptyState title="No agents to show yet." />;
    }

    if (filtered.length === 0) {
      return (
        <EmptyState title="No agents match that specialty." />
      );
    }

    return (
      <AgentList
        agents={filtered}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <section
      id="team"
      className="team"
      aria-labelledby="team-heading"
      tabIndex={-1}
    >
      <div className="team__inner">
        <h2 id="team-heading" className="team__title">
          The team
        </h2>
        <p className="team__lede">Pick an agent to get a personal hello.</p>

        {loadState === 'ready' && agents.length > 0 ? (
          <AgentFilter value={filter} onChange={setFilter} />
        ) : null}

        <div className="team__layout">
          <div className="team__greeting-wrap">
            <AgentGreeting agent={selected} />
          </div>
          <div className="team__roster-wrap">{renderRoster()}</div>
        </div>
      </div>
    </section>
  );
}
