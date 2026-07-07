import { useToastStore } from '@/stores/prefs';

export function Toast() {
  const message = useToastStore((s) => s.message);
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg"
    >
      {message}
    </div>
  );
}
