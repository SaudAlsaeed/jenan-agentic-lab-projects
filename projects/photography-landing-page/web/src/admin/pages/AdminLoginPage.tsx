import {
  useEffect,
  useId,
  useState,
  type FormEvent,
} from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AdminApiError } from '@/admin/api';
import { useAdminAuth } from '@/admin/AuthContext';
import { ErrorBanner } from '@/admin/components/AdminFeedback';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/config/site';

type LocationState = {
  from?: string;
  reason?: string;
};

export function AdminLoginPage() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const formId = useId();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    state?.reason === 'auth'
      ? 'انتهت الجلسة — يرجى تسجيل الدخول مرة أخرى'
      : null,
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = `تسجيل الدخول | ${SITE.nameAr}`;
  }, []);

  if (isAuthenticated) {
    return <Navigate to={state?.from ?? '/admin'} replace />;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate(state?.from ?? '/admin', { replace: true });
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 401) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      } else {
        setError('تعذر تسجيل الدخول. تحقق من اتصال الخادم وحاول مجدداً.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-void)] px-[var(--pad-x)] py-12">
      <div className="w-full max-w-md animate-[fadeIn_0.4s_ease-out]">
        <div className="mb-8 text-center">
          <p className="font-ui text-xs tracking-wide text-[var(--text-muted)]">
            لوحة الإدارة
          </p>
          <h1 className="font-display mt-2 text-2xl font-bold text-[var(--text-primary)]">
            تسجيل الدخول
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{SITE.nameAr}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-6 shadow-lg shadow-black/30"
          noValidate
        >
          {error ? <ErrorBanner>{error}</ErrorBanner> : null}

          <div>
            <label
              htmlFor={`${formId}-user`}
              className="font-ui mb-1.5 block text-sm text-[var(--text-muted)]"
            >
              اسم المستخدم
            </label>
            <input
              id={`${formId}-user`}
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="min-h-[var(--touch-min)] w-full rounded-sm border border-[var(--line)] bg-[var(--bg-void)] px-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-sand)]"
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-pass`}
              className="font-ui mb-1.5 block text-sm text-[var(--text-muted)]"
            >
              كلمة المرور
            </label>
            <input
              id={`${formId}-pass`}
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="min-h-[var(--touch-min)] w-full rounded-sm border border-[var(--line)] bg-[var(--bg-void)] px-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-sand)]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={submitting || !username.trim() || !password}
          >
            {submitting ? 'جاري الدخول…' : 'دخول'}
          </Button>
        </form>
      </div>
    </div>
  );
}
