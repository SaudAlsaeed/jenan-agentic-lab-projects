/** Site config — stakeholder decisions from JEN-7. */

export const SITE = {
  nameAr: 'وكالة محمد السعيد للتصوير الإحترافي',
  nameEn: 'Mohammed Alsaeed Agency for Professional Photography',
  cityAr: 'الرياض',
  cityEn: 'Riyadh',
  /** Placeholder until business provides a real number (digits only, country code). */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? '966500000000',
  phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY ?? '+966 50 000 0000',
  apiBase: import.meta.env.VITE_API_BASE ?? 'http://localhost:3002',
} as const;

export type Locale = 'ar' | 'en';
export type ServiceType =
  | 'events'
  | 'portrait'
  | 'products'
  | 'video'
  | 'other';

export type PortfolioCategory = 'events' | 'portrait' | 'products' | 'video';
