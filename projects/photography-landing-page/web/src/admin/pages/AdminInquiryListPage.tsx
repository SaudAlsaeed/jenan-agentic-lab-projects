import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminApiError, listInquiries } from '@/admin/api';
import { useAdminAuth } from '@/admin/AuthContext';
import {
  EmptyState,
  ErrorBanner,
  LoadingSkeleton,
} from '@/admin/components/AdminFeedback';
import { InquiryFilters } from '@/admin/components/InquiryFilters';
import { InquiryTable } from '@/admin/components/InquiryTable';
import type { Inquiry, InquiryListFilters } from '@/admin/types';
import { SITE } from '@/config/site';

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

export function AdminInquiryListPage() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<InquiryListFilters>({});
  const debouncedQ = useDebounced(filters.q, 300);
  const queryFilters = useMemo(
    () => ({ ...filters, q: debouncedQ }),
    [filters, debouncedQ],
  );

  const [items, setItems] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `الطلبات | ${SITE.nameAr}`;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listInquiries(queryFilters)
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof AdminApiError && err.status === 401) {
          logout();
          navigate('/admin/login', {
            replace: true,
            state: { reason: 'auth' },
          });
          return;
        }
        setError(
          err instanceof Error ? err.message : 'تعذر تحميل الطلبات',
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryFilters, logout, navigate]);

  return (
    <div className="space-y-6 animate-[fadeIn_0.35s_ease-out]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">الطلبات</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            إدارة استفسارات الحجز والتواصل
          </p>
        </div>
        {!loading && !error ? (
          <p className="font-ui text-sm text-[var(--text-muted)]">
            {total} نتيجة
          </p>
        ) : null}
      </div>

      <InquiryFilters filters={filters} onChange={setFilters} />

      {error ? <ErrorBanner>{error}</ErrorBanner> : null}
      {loading ? <LoadingSkeleton /> : null}
      {!loading && !error && items.length === 0 ? (
        <EmptyState>لا توجد طلبات مطابقة للفلاتر الحالية.</EmptyState>
      ) : null}
      {!loading && !error && items.length > 0 ? (
        <InquiryTable items={items} />
      ) : null}
    </div>
  );
}
