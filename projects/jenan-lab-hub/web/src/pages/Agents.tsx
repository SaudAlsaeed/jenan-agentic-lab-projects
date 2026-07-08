import { useMemo, useState } from 'react';
import { Bot } from 'lucide-react';
import { useAgents } from '@/api/client';
import { TopBar } from '@/components/shell/TopBar';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';
import type { Agent, AgentStatus } from '@/types';

type SortKey = 'name' | 'status' | 'runtime' | 'lastActive';
type SortDir = 'asc' | 'desc';

const statusVariant: Record<AgentStatus, 'success' | 'accent' | 'danger'> = {
  idle: 'success',
  running: 'accent',
  blocked: 'danger',
};

export function AgentsPage() {
  const { data: agents, isLoading } = useAgents();
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selected, setSelected] = useState<Agent | null>(null);

  const sorted = useMemo(() => {
    if (!agents) return [];
    return [...agents].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [agents, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const thClass =
    'cursor-pointer px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:text-foreground';

  return (
    <>
      <TopBar title="Agents" subtitle="Monitor agent status and workloads" />
      <main className="flex-1 p-6">
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <Bot className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium">No agents found</p>
            <p className="text-sm text-muted-foreground">
              Agents will appear here once configured in the lab.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th scope="col" className={thClass} onClick={() => toggleSort('name')}>
                    Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className={thClass} onClick={() => toggleSort('status')}>
                    Status {sortKey === 'status' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Current task
                  </th>
                  <th scope="col" className={thClass} onClick={() => toggleSort('runtime')}>
                    Runtime {sortKey === 'runtime' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className={thClass} onClick={() => toggleSort('lastActive')}>
                    Last active {sortKey === 'lastActive' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((agent) => (
                  <tr
                    key={agent.id}
                    className="cursor-pointer border-b border-border hover:bg-muted/50"
                    onClick={() => setSelected(agent)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelected(agent)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${agent.name}`}
                  >
                    <td className="px-4 py-3 font-medium">{agent.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[agent.status]}>{agent.status}</Badge>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      {agent.currentTask ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{agent.runtime}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatRelativeTime(agent.lastActive)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? 'Agent'}
      >
        {selected && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                Instructions excerpt
              </h3>
              <p className="text-sm leading-relaxed">{selected.instructionsExcerpt}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((skill) => (
                  <Badge key={skill} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                Recent tasks
              </h3>
              <ul className="space-y-2 text-sm">
                {selected.recentTasks.map((task) => (
                  <li key={task} className="font-mono text-xs">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
