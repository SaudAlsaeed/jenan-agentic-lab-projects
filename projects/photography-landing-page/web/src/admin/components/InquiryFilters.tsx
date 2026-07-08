import type { InquiryListFilters } from '@/admin/types';
import {
  ADMIN_SERVICE_TYPES,
  INQUIRY_STATUSES,
  SERVICE_LABELS_AR,
} from '@/admin/types';

type Props = {
  filters: InquiryListFilters;
  onChange: (next: InquiryListFilters) => void;
};

const fieldClass =
  'min-h-[var(--touch-min)] w-full rounded-sm border border-[var(--line)] bg-[var(--bg-void)] px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-sand)]';

const labelClass = 'font-ui mb-1 block text-xs text-[var(--text-muted)]';

export function InquiryFilters({ filters, onChange }: Props) {
  function patch(partial: Partial<InquiryListFilters>) {
    onChange({ ...filters, ...partial });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div>
        <label htmlFor="filter-status" className={labelClass}>
          الحالة
        </label>
        <select
          id="filter-status"
          className={fieldClass}
          value={filters.status ?? ''}
          onChange={(e) =>
            patch({
              status: (e.target.value || undefined) as
                | InquiryListFilters['status']
                | undefined,
            })
          }
        >
          <option value="">الكل</option>
          {INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-service" className={labelClass}>
          الخدمة
        </label>
        <select
          id="filter-service"
          className={fieldClass}
          value={filters.service ?? ''}
          onChange={(e) =>
            patch({
              service: (e.target.value || undefined) as
                | InquiryListFilters['service']
                | undefined,
            })
          }
        >
          <option value="">الكل</option>
          {ADMIN_SERVICE_TYPES.map((s) => (
            <option key={s} value={s}>
              {SERVICE_LABELS_AR[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-from" className={labelClass}>
          من تاريخ
        </label>
        <input
          id="filter-from"
          type="date"
          className={fieldClass}
          value={filters.dateFrom ?? ''}
          onChange={(e) =>
            patch({ dateFrom: e.target.value || undefined })
          }
        />
      </div>

      <div>
        <label htmlFor="filter-to" className={labelClass}>
          إلى تاريخ
        </label>
        <input
          id="filter-to"
          type="date"
          className={fieldClass}
          value={filters.dateTo ?? ''}
          onChange={(e) => patch({ dateTo: e.target.value || undefined })}
        />
      </div>

      <div>
        <label htmlFor="filter-q" className={labelClass}>
          بحث (الاسم / الجوال)
        </label>
        <input
          id="filter-q"
          type="search"
          placeholder="اسم أو رقم…"
          className={fieldClass}
          value={filters.q ?? ''}
          onChange={(e) => patch({ q: e.target.value || undefined })}
        />
      </div>
    </div>
  );
}
