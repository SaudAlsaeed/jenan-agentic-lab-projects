import { useContent } from '@/api/client';
import { WelcomeHero } from '@/components/WelcomeHero';
import { ErrorState } from '@/components/States';
import { HeroSkeleton } from '@/components/ui/Skeleton';

export function HomePage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useContent();

  if (isLoading || (isFetching && !data)) {
    return <HeroSkeleton />;
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

  return <WelcomeHero welcome={data.welcome} />;
}
