import type { PortfolioCategory, ServiceType } from '@/config/site';

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  /** Unsplash placeholders until real assets arrive */
  src: string;
  altAr: string;
  altEn: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'e1',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    altAr: 'تغطية عرس — لحظة تبادل الخواتم',
    altEn: 'Wedding coverage — ring exchange',
  },
  {
    id: 'e2',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80',
    altAr: 'مناسبة خاصة — تفاصيل الزفاف',
    altEn: 'Private event — wedding details',
  },
  {
    id: 'e3',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80',
    altAr: 'حفل — لحظة احتفال',
    altEn: 'Celebration moment',
  },
  {
    id: 'p1',
    category: 'portrait',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80',
    altAr: 'جلسة بورتريه شخصية',
    altEn: 'Personal portrait session',
  },
  {
    id: 'p2',
    category: 'portrait',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80',
    altAr: 'بورتريه بإضاءة ناعمة',
    altEn: 'Soft-light portrait',
  },
  {
    id: 'p3',
    category: 'portrait',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80',
    altAr: 'جلسة عائلية',
    altEn: 'Family portrait',
  },
  {
    id: 'pr1',
    category: 'products',
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
    altAr: 'تصوير منتج',
    altEn: 'Product photography',
  },
  {
    id: 'pr2',
    category: 'products',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    altAr: 'تصوير تجاري',
    altEn: 'Commercial product shot',
  },
  {
    id: 'v1',
    category: 'video',
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80',
    altAr: 'تصوير سينمائي — خلف الكاميرا',
    altEn: 'Cinematic video — behind the camera',
  },
  {
    id: 'v2',
    category: 'video',
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80',
    altAr: 'تغطية فيديو للمناسبة',
    altEn: 'Event video coverage',
  },
];

export const PORTFOLIO_TAB_ORDER: PortfolioCategory[] = [
  'events',
  'video',
  'portrait',
  'products',
];

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  service: ServiceType;
  expectedDate?: string;
  preferredTime?: string;
  city?: string;
  details?: string;
};
