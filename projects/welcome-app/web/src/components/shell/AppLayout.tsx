import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/shell/AppHeader';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
