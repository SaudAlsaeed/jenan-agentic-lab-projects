import { useContent } from '@/api/client';
import { AgentCard } from '@/components/AgentCard';
import { EmptyState, ErrorState } from '@/components/States';
import { RosterSkeleton } from '@/components/ui/Skeleton';

export function RosterPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useContent();

  if (isLoading || (isFetching && !data)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-64 animate-pulse rounded-md bg-muted" />
        </div>
        <RosterSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (data.agents.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Web Squad
        </h1>
        <p className="mt-2 text-muted-foreground">
          Six agents on your delivery pipeline.
        </p>
      </header>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {data.agents.map((agent, index) => (
          <li key={agent.id}>
            <AgentCard agent={agent} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
