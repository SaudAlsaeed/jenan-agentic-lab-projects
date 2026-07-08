import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm font-medium transition-colors',
    isActive
      ? 'border-b-2 border-accent text-accent'
      : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
  );

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Welcome
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/agents" className={navLinkClass}>
            Squad
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
