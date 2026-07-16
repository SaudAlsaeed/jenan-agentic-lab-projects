type ErrorStateProps = {
  onRetry: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="team-state team-state--error" role="alert" data-testid="error-state">
      <p className="team-state__title">Couldn’t load the team.</p>
      <p className="team-state__body">
        Check that the API is running, then try again.
      </p>
      <button type="button" className="team-state__action" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
