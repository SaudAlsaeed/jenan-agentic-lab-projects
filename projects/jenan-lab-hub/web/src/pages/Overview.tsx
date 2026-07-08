import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Bot, CheckCircle2, FolderKanban, ListTodo } from 'lucide-react';
import {
  useActivity,
  useAgentStatusChart,
  useIssueTrend,
  useKpis,
} from '@/api/client';
import { TopBar } from '@/components/shell/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { KpiSkeleton, Skeleton } from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';
import { useState } from 'react';

const kpiConfig = [
  { key: 'activeAgents' as const, label: 'Active agents', icon: Bot },
  { key: 'openIssues' as const, label: 'Open issues', icon: ListTodo },
  { key: 'projectsInProgress' as const, label: 'Projects in progress', icon: FolderKanban },
  { key: 'tasksCompleted7d' as const, label: 'Tasks completed (7d)', icon: CheckCircle2 },
];

export function OverviewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: kpis, isLoading: kpisLoading } = useKpis();
  const { data: activity, isLoading: activityLoading } = useActivity();
  const { data: issueTrend, isLoading: trendLoading } = useIssueTrend();
  const { data: agentStatus, isLoading: statusLoading } = useAgentStatusChart();
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const handleRefresh = () => {
    void queryClient.invalidateQueries();
    setLastRefreshed(new Date());
  };

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <>
      <TopBar title="Overview" subtitle="Mission control for your agentic lab" />
      <main className="flex-1 space-y-6 p-6">
        <section className="rounded-xl border border-border bg-gradient-to-r from-card to-accent-muted/30 p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent">Jenan-agentic-lab</p>
              <h2 className="mt-1 text-2xl font-bold">Team command center</h2>
              <p className="mt-1 text-sm text-muted-foreground">{today}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Last refreshed: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpisLoading
            ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
            : kpiConfig.map(({ key, label, icon: Icon }) => (
                <Card key={key}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-lg bg-accent-muted p-3 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{label}</p>
                      <p className="text-2xl font-bold">{kpis?.[key] ?? 0}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Issues this week</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              {trendLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={issueTrend}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--accent)"
                      fill="var(--accent-muted)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Agent status</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              {statusLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentStatus}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/issues')}>New issue</Button>
          <Button variant="secondary" onClick={() => navigate('/agents')}>
            View agents
          </Button>
          <Button variant="secondary" onClick={() => navigate('/projects')}>
            Open projects
          </Button>
          <Button variant="ghost" onClick={handleRefresh}>
            Refresh all
          </Button>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {activity?.slice(0, 10).map((event) => (
                  <li key={event.id} className="flex items-center gap-3 py-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-muted text-xs font-semibold text-accent"
                      aria-hidden="true"
                    >
                      {event.actorInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{event.actorName}</span>{' '}
                        <span className="text-muted-foreground">{event.action}</span>{' '}
                        <span className="font-mono text-sm">{event.target}</span>
                      </p>
                    </div>
                    <time
                      className="shrink-0 text-xs text-muted-foreground"
                      dateTime={event.timestamp}
                    >
                      {formatRelativeTime(event.timestamp)}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
