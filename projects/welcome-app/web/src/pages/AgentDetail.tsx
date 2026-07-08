import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/api/client';
import { ErrorState, NotFoundState } from '@/components/States';
import { InitialsBadge } from '@/components/ui/InitialsBadge';
import { DetailSkeleton } from '@/components/ui/Skeleton';

export function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch, isFetching } = useContent();

  if (isLoading || (isFetching && !data)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <DetailSkeleton />
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

  const agent = data.agents.find((item) => item.id === id);
  if (!agent) {
    return <NotFoundState agentId={id} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/agents"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to squad
        </Link>

        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <InitialsBadge initials={agent.avatarInitials} size="lg" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {agent.displayName}
            </h1>
            <p className="mt-1 text-muted-foreground">{agent.roleTitle}</p>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <section aria-labelledby="responsibilities-heading">
          <h2
            id="responsibilities-heading"
            className="text-sm font-medium tracking-wide text-muted-foreground uppercase"
          >
            Responsibilities
          </h2>
          <p className="mt-3 max-w-[65ch] leading-relaxed text-foreground">
            {agent.responsibilities}
          </p>
        </section>

        <section className="mt-8" aria-labelledby="introduction-heading">
          <h2
            id="introduction-heading"
            className="text-sm font-medium tracking-wide text-muted-foreground uppercase"
          >
            Introduction
          </h2>
          <p className="mt-3 max-w-[65ch] leading-relaxed text-foreground">
            {agent.greeting}
          </p>
        </section>
      </div>
    </div>
  );
}
