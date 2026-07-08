/** Admin inquiry types — aligned with API `api/src/constants.ts` + `types.ts`. */

export const INQUIRY_STATUSES = [
  'جديد',
  'تم التواصل',
  'مؤكد',
  'مكتمل',
  'ملغي',
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const ADMIN_SERVICE_TYPES = [
  'weddings_events',
  'video',
  'portraits',
  'products',
  'other',
] as const;

export type AdminServiceType = (typeof ADMIN_SERVICE_TYPES)[number];

export const SERVICE_LABELS_AR: Record<AdminServiceType, string> = {
  weddings_events: 'تصوير مناسبة / أعراس',
  video: 'تصوير فيديو',
  portraits: 'جلسة بورتريه',
  products: 'تصوير منتجات / أعمال تجارية',
  other: 'أخرى',
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: AdminServiceType;
  date: string | null;
  preferredTime: string | null;
  location: string | null;
  details: string | null;
  status: InquiryStatus;
  internalNotes: string | null;
  telegramSent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InquiryListFilters = {
  status?: InquiryStatus;
  service?: AdminServiceType;
  dateFrom?: string;
  dateTo?: string;
  q?: string;
};

export const STATUS_CHIP_CLASS: Record<InquiryStatus, string> = {
  جديد: 'text-[var(--status-new)] bg-[color-mix(in_srgb,var(--status-new)_18%,transparent)]',
  'تم التواصل':
    'text-[var(--status-contacted)] bg-[color-mix(in_srgb,var(--status-contacted)_18%,transparent)]',
  مؤكد:
    'text-[var(--status-confirmed)] bg-[color-mix(in_srgb,var(--status-confirmed)_18%,transparent)]',
  مكتمل: 'text-[var(--status-done)] bg-[color-mix(in_srgb,var(--status-done)_18%,transparent)]',
  ملغي:
    'text-[var(--status-cancelled)] bg-[color-mix(in_srgb,var(--status-cancelled)_18%,transparent)]',
};
