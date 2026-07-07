import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/shell/Sidebar';
import { Toast } from '@/components/ui/Toast';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
      <Toast />
    </div>
  );
}
