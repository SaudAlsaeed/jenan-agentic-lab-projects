import { useEffect, useId, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AdminApiError,
  getInquiry,
  inquiryWhatsAppUrl,
  phoneTelHref,
  updateInquiryNotes,
  updateInquiryStatus,
} from '@/admin/api';
import { useAdminAuth } from '@/admin/AuthContext';
import {
  ErrorBanner,
  LoadingSkeleton,
} from '@/admin/components/AdminFeedback';
import { StatusChip } from '@/admin/components/StatusChip';
import { formatDateOnly, formatDateTime } from '@/admin/format';
import type { Inquiry, InquiryStatus } from '@/admin/types';
import {
  INQUIRY_STATUSES,
  SERVICE_LABELS_AR,
} from '@/admin/types';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/config/site';

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--line)] py-3 last:border-0">
      <dt className="font-ui text-xs text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1 text-[var(--text-primary)]">{children}</dd>
    </div>
  );
}

export function AdminInquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const notesId = useId();

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [statusSaving, setStatusSaving] = useState(false);
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    getInquiry(id)
      .then((data) => {
        if (cancelled) return;
        setInquiry(data);
        setNotes(data.internalNotes ?? '');
        document.title = `${data.name} | ${SITE.nameAr}`;
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
        if (err instanceof AdminApiError && err.status === 404) {
          setError('الطلب غير موجود');
          return;
        }
        setError(
          err instanceof Error ? err.message : 'تعذر تحميل الطلب',
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, logout, navigate]);

  async function onStatusChange(status: InquiryStatus) {
    if (!inquiry || status === inquiry.status) return;
    setStatusSaving(true);
    setActionError(null);
    try {
      const updated = await updateInquiryStatus(inquiry.id, status);
      setInquiry(updated);
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 401) {
        logout();
        navigate('/admin/login', {
          replace: true,
          state: { reason: 'auth' },
        });
        return;
      }
      setActionError('تعذر تحديث الحالة');
    } finally {
      setStatusSaving(false);
    }
  }

  async function onSaveNotes() {
    if (!inquiry) return;
    setNotesSaving(true);
    setNotesSaved(false);
    setActionError(null);
    try {
      const updated = await updateInquiryNotes(inquiry.id, notes);
      setInquiry(updated);
      setNotes(updated.internalNotes ?? '');
      setNotesSaved(true);
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 401) {
        logout();
        navigate('/admin/login', {
          replace: true,
          state: { reason: 'auth' },
        });
        return;
      }
      setActionError('تعذر حفظ الملاحظات');
    } finally {
      setNotesSaving(false);
    }
  }

  if (loading) return <LoadingSkeleton rows={6} />;
  if (error) {
    return (
      <div className="space-y-4">
        <ErrorBanner>{error}</ErrorBanner>
        <Link
          to="/admin"
          className="font-ui text-[var(--accent-sand)] underline-offset-2 hover:underline"
        >
          العودة للقائمة
        </Link>
      </div>
    );
  }
  if (!inquiry) return null;

  const waHref = inquiryWhatsAppUrl(
    inquiry,
    SERVICE_LABELS_AR[inquiry.service] ?? inquiry.service,
  );

  return (
    <div className="space-y-8 animate-[slideUp_0.35s_ease-out]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/admin"
            className="font-ui text-sm text-[var(--text-muted)] hover:text-[var(--accent-sand)]"
          >
            ← العودة للقائمة
          </Link>
          <h1 className="font-display mt-2 text-2xl font-bold">{inquiry.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusChip status={inquiry.status} />
            {!inquiry.telegramSent ? (
              <span className="font-ui rounded-full bg-[color-mix(in_srgb,var(--danger)_15%,transparent)] px-2.5 py-0.5 text-xs text-[var(--danger)]">
                تلغرام لم يُرسل
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" href={phoneTelHref(inquiry.phone)}>
            اتصال
          </Button>
          <Button variant="primary" href={waHref}>
            واتساب
          </Button>
        </div>
      </div>

      {actionError ? <ErrorBanner>{actionError}</ErrorBanner> : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] px-5">
          <h2 className="font-display border-b border-[var(--line)] py-4 text-lg font-semibold">
            تفاصيل الطلب
          </h2>
          <dl>
            <Field label="الجوال">
              <span className="font-ui dir-ltr">{inquiry.phone}</span>
            </Field>
            <Field label="البريد">
              {inquiry.email ?? '—'}
            </Field>
            <Field label="الخدمة">
              {SERVICE_LABELS_AR[inquiry.service] ?? inquiry.service}
            </Field>
            <Field label="تاريخ المناسبة">{formatDateOnly(inquiry.date)}</Field>
            <Field label="الوقت المفضل">
              {inquiry.preferredTime ?? '—'}
            </Field>
            <Field label="الموقع">{inquiry.location ?? '—'}</Field>
            <Field label="التفاصيل">{inquiry.details ?? '—'}</Field>
            <Field label="تاريخ الإرسال">
              {formatDateTime(inquiry.createdAt)}
            </Field>
            <Field label="آخر تحديث">
              {formatDateTime(inquiry.updatedAt)}
            </Field>
          </dl>
        </section>

        <div className="space-y-6">
          <section className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
            <h2 className="font-display text-lg font-semibold">الحالة</h2>
            <label htmlFor="status-select" className="sr-only">
              تحديث الحالة
            </label>
            <select
              id="status-select"
              className="mt-3 min-h-[var(--touch-min)] w-full rounded-sm border border-[var(--line)] bg-[var(--bg-void)] px-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent-sand)]"
              value={inquiry.status}
              disabled={statusSaving}
              onChange={(e) =>
                onStatusChange(e.target.value as InquiryStatus)
              }
            >
              {INQUIRY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {statusSaving ? (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                جاري الحفظ…
              </p>
            ) : null}
          </section>

          <section className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
            <h2 className="font-display text-lg font-semibold">
              ملاحظات داخلية
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              لا تظهر للعميل
            </p>
            <label htmlFor={notesId} className="sr-only">
              الملاحظات الداخلية
            </label>
            <textarea
              id={notesId}
              rows={6}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesSaved(false);
              }}
              className="mt-3 w-full rounded-sm border border-[var(--line)] bg-[var(--bg-void)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-sand)]"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button
                type="button"
                onClick={onSaveNotes}
                disabled={notesSaving}
              >
                {notesSaving ? 'جاري الحفظ…' : 'حفظ الملاحظات'}
              </Button>
              {notesSaved ? (
                <span className="text-sm text-[var(--success)]">تم الحفظ</span>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
