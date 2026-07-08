import { cn } from '@/lib/utils';

interface InitialsBadgeProps {
  initials: string;
  size?: 'md' | 'lg';
  className?: string;
}

const sizes = {
  md: 'h-11 w-11 text-sm',
  lg: 'h-20 w-20 text-2xl sm:h-[4.5rem] sm:w-[4.5rem]',
};

export function InitialsBadge({
  initials,
  size = 'md',
  className,
}: InitialsBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-2xl bg-accent-muted font-medium text-accent',
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
