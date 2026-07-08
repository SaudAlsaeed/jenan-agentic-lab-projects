import { Link } from 'react-router-dom';
import { StatusChip } from '@/admin/components/StatusChip';
import { formatDateTime } from '@/admin/format';
import type { Inquiry } from '@/admin/types';
import { SERVICE_LABELS_AR } from '@/admin/types';

type Props = {
  items: Inquiry[];
};

export function InquiryTable({ items }: Props) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-sm border border-[var(--line)] md:block">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead className="bg-[var(--bg-elevated)] text-start">
            <tr className="font-ui text-xs text-[var(--text-muted)]">
              <th className="px-4 py-3 font-medium">التاريخ</th>
              <th className="px-4 py-3 font-medium">الاسم</th>
              <th className="px-4 py-3 font-medium">الجوال</th>
              <th className="px-4 py-3 font-medium">الخدمة</th>
              <th className="px-4 py-3 font-medium">الحالة</th>
              <th className="px-4 py-3 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[var(--line)] transition hover:bg-[var(--bg-elevated)]/60"
              >
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-muted)]">
                  {formatDateTime(item.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 dir-ltr text-start font-ui">
                  {item.phone}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {SERVICE_LABELS_AR[item.service] ?? item.service}
                </td>
                <td className="px-4 py-3">
                  <StatusChip status={item.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/admin/inquiries/${item.id}`}
                    className="font-ui text-[var(--accent-sand)] underline-offset-2 hover:underline"
                  >
                    عرض
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="space-y-3 md:hidden">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={`/admin/inquiries/${item.id}`}
              className="block rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-4 transition hover:border-[var(--accent-sand)]/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="font-ui mt-0.5 dir-ltr text-sm text-[var(--text-muted)]">
                    {item.phone}
                  </p>
                </div>
                <StatusChip status={item.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {SERVICE_LABELS_AR[item.service] ?? item.service}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {formatDateTime(item.createdAt)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
