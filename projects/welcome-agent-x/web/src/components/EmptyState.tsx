type EmptyStateProps = {
  title: string;
  body?: string;
};

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="team-state" role="status" data-testid="empty-state">
      <p className="team-state__title">{title}</p>
      {body ? <p className="team-state__body">{body}</p> : null}
    </div>
  );
}
