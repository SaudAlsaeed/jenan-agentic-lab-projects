import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useIssues, useUpdateIssueStatus } from '@/api/client';
import { TopBar } from '@/components/shell/TopBar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToastStore } from '@/stores/prefs';
import type { Issue, IssuePriority, IssueStatus } from '@/types';

const columns: { status: IssueStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'todo', label: 'Todo' },
  { status: 'in_progress', label: 'In progress' },
  { status: 'in_review', label: 'In review' },
  { status: 'done', label: 'Done' },
];

const priorityColor: Record<IssuePriority, string> = {
  low: 'bg-muted-foreground',
  medium: 'bg-warning',
  high: 'bg-accent',
  urgent: 'bg-danger',
};

export function IssuesPage() {
  const { data: issues, isLoading } = useIssues();
  const updateStatus = useUpdateIssueStatus();
  const showToast = useToastStore((s) => s.showToast);
  const [selected, setSelected] = useState<Issue | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [localIssues, setLocalIssues] = useState<Issue[] | null>(null);

  const displayIssues = localIssues ?? issues ?? [];

  const byColumn = useMemo(() => {
    const map = new Map<IssueStatus, Issue[]>();
    for (const col of columns) {
      map.set(
        col.status,
        displayIssues
          .filter((i) => i.status === col.status)
          .sort((a, b) => a.columnOrder - b.columnOrder),
      );
    }
    return map;
  }, [displayIssues]);

  const handleDragStart = (issue: Issue, columnStatus: IssueStatus) => {
    setDragId(issue.id);
    (window as unknown as { __dragSourceColumn: IssueStatus }).__dragSourceColumn =
      columnStatus;
  };

  const handleDrop = (targetStatus: IssueStatus) => {
    if (!dragId) return;
    const sourceColumn = (window as unknown as { __dragSourceColumn: IssueStatus })
      .__dragSourceColumn;

    if (sourceColumn !== targetStatus) {
      showToast('Cross-column drag coming soon');
      setDragId(null);
      return;
    }

    const columnIssues = byColumn.get(targetStatus) ?? [];
    const dragged = columnIssues.find((i) => i.id === dragId);
    if (!dragged) return;

    const reordered = columnIssues.filter((i) => i.id !== dragId);
    reordered.push(dragged);
    const updated = displayIssues.map((issue) => {
      if (issue.status !== targetStatus) return issue;
      const idx = reordered.findIndex((r) => r.id === issue.id);
      return idx >= 0 ? { ...issue, columnOrder: idx } : issue;
    });
    setLocalIssues(updated);
    setDragId(null);
  };

  const handleStatusChange = (status: IssueStatus) => {
    if (!selected) return;
    updateStatus.mutate({ issueId: selected.id, status });
    setSelected({ ...selected, status });
    setLocalIssues(null);
  };

  return (
    <>
      <TopBar title="Issues" subtitle="Kanban board for lab work" />
      <main className="flex-1 overflow-x-auto p-6">
        {isLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-64 shrink-0" />
            ))}
          </div>
        ) : (
          <div className="flex min-w-max gap-4">
            {columns.map((col) => (
              <div
                key={col.status}
                className="w-64 shrink-0"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(col.status)}
              >
                <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
                  {col.label}
                  <span className="ml-2 font-mono text-xs">
                    ({byColumn.get(col.status)?.length ?? 0})
                  </span>
                </h2>
                <div className="space-y-2">
                  {(byColumn.get(col.status) ?? []).map((issue) => (
                    <button
                      key={issue.id}
                      type="button"
                      draggable
                      onDragStart={() => handleDragStart(issue, col.status)}
                      onClick={() => setSelected(issue)}
                      className="w-full rounded-lg border border-border bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${priorityColor[issue.priority]}`}
                          aria-label={`Priority: ${issue.priority}`}
                        />
                        <span className="font-mono text-xs text-muted-foreground">
                          {issue.identifier}
                        </span>
                      </div>
                      <p className="mb-2 text-sm font-medium leading-snug">
                        {issue.title}
                      </p>
                      <Badge variant="default" className="text-xs">
                        {issue.assignee.type === 'squad' ? '👥' : '🤖'}{' '}
                        {issue.assignee.name}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.identifier ?? 'Issue'}
      >
        {selected && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{selected.title}</h3>
            <div>
              <label htmlFor="issue-status" className="mb-1 block text-sm font-medium">
                Status
              </label>
              <select
                id="issue-status"
                value={selected.status}
                onChange={(e) => handleStatusChange(e.target.value as IssueStatus)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {columns.map((c) => (
                  <option key={c.status} value={c.status}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{selected.description}</ReactMarkdown>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
