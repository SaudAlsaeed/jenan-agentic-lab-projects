import type { InquiryStatus } from '@/admin/types';
import { STATUS_CHIP_CLASS } from '@/admin/types';

export function StatusChip({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`font-ui inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CHIP_CLASS[status]}`}
    >
      {status}
    </span>
  );
}
