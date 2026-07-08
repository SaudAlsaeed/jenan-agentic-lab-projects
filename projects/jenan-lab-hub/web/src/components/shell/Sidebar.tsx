import {
  Bot,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePrefsStore } from '@/stores/prefs';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/agents', label: 'Agents', icon: Bot },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/issues', label: 'Issues', icon: ListTodo },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const collapsed = usePrefsStore((s) => s.sidebarCollapsed);
  const density = usePrefsStore((s) => s.sidebarDensity);
  const toggleSidebar = usePrefsStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border bg-card transition-all duration-300',
        collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]',
        density === 'compact' ? 'text-sm' : 'text-base',
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        {!collapsed && (
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Lab Hub
            </p>
            <p className="font-semibold">Jenan-agentic-lab</p>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-lg p-2 hover:bg-muted"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors',
                isActive
                  ? 'bg-accent-muted text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center px-2',
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
