import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong loading this page.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="mx-auto flex max-w-md flex-col items-start gap-4 px-4 py-16"
      role="alert"
    >
      <h1 className="text-xl font-semibold text-foreground">Couldn’t load content</h1>
      <p className="text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button type="button" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-xl font-semibold text-foreground">No agents yet</h1>
      <p className="mt-2 text-muted-foreground">
        The Web Squad roster is empty. Check the API content payload and try again.
      </p>
    </div>
  );
}

interface NotFoundStateProps {
  agentId?: string;
}

export function NotFoundState({ agentId }: NotFoundStateProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-xl font-semibold text-foreground">Agent not found</h1>
      <p className="mt-2 text-muted-foreground">
        {agentId
          ? `No agent matches “${agentId}”. Pick someone from the squad roster.`
          : 'That page doesn’t exist.'}
      </p>
      <Link
        to="/agents"
        className="mt-4 inline-flex min-h-11 items-center text-accent hover:underline"
      >
        Back to squad
      </Link>
    </div>
  );
}
