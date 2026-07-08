import { useEffect } from 'react';
import { applyTheme, resolveTheme } from '@/lib/utils';
import { usePrefsStore } from '@/stores/prefs';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = usePrefsStore((s) => s.theme);

  useEffect(() => {
    applyTheme(resolveTheme(theme));

    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(resolveTheme('system'));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return <>{children}</>;
}
