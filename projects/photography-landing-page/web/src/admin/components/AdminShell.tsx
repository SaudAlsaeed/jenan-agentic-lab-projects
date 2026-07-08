import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/admin/AuthContext';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui/Button';

export function AdminShell() {
  const { username, logout } = useAdminAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)]">
        <div className="mx-auto flex max-w-[var(--content-max)] items-center justify-between gap-4 px-[var(--pad-x)] py-4">
          <div className="min-w-0">
            <p className="font-ui text-xs tracking-wide text-[var(--text-muted)]">
              لوحة الإدارة
            </p>
            <Link
              to="/admin"
              className="font-display truncate text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-sand)]"
            >
              {SITE.nameAr}
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {username ? (
              <span className="font-ui hidden text-sm text-[var(--text-muted)] sm:inline">
                {username}
              </span>
            ) : null}
            <Button variant="secondary" type="button" onClick={onLogout}>
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-8">
        <Outlet />
      </main>
    </div>
  );
}
