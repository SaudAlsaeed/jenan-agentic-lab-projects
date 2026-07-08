/** Inquiry status workflow (Arabic labels per brief §8). */
export const INQUIRY_STATUSES = [
  'جديد',
  'تم التواصل',
  'مؤكد',
  'مكتمل',
  'ملغي',
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const DEFAULT_INQUIRY_STATUS: InquiryStatus = 'جديد';

/**
 * Service values accepted by the public form.
 * Confirmed focus (parent metadata): weddings/events, video, portraits.
 * Products/commercial remain per brief as secondary options.
 */
export const SERVICE_TYPES = [
  'weddings_events',
  'video',
  'portraits',
  'products',
  'other',
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const SERVICE_LABELS_AR: Record<ServiceType, string> = {
  weddings_events: 'تصوير مناسبة / أعراس',
  video: 'تصوير فيديو',
  portraits: 'جلسة بورتريه',
  products: 'تصوير منتجات / أعمال تجارية',
  other: 'أخرى',
};

export const SERVICE_LABELS_EN: Record<ServiceType, string> = {
  weddings_events: 'Weddings / Events',
  video: 'Video',
  portraits: 'Portraits',
  products: 'Products / Commercial',
  other: 'Other',
};
