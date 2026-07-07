import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const queryClient = useQueryClient();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Button
        variant="secondary"
        size="sm"
        aria-label="Refresh data"
        onClick={() => void queryClient.invalidateQueries()}
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
    </header>
  );
}
