import { SITE } from '@/config/site';
import type { ServiceType } from '@/config/site';
import type { InquiryPayload } from '@/data/portfolio';

/**
 * BE service enum (JEN-11). FE UI still uses shorter keys for portfolio/prefill.
 * Map at the API boundary so contact submit matches POST /api/inquiries.
 */
export type ApiServiceType =
  | 'weddings_events'
  | 'video'
  | 'portraits'
  | 'products'
  | 'other';

const SERVICE_TO_API: Record<ServiceType, ApiServiceType> = {
  events: 'weddings_events',
  video: 'video',
  portrait: 'portraits',
  products: 'products',
  other: 'other',
};

/** Body shape accepted by POST /api/inquiries (api/src/validation.ts). */
export type ApiInquiryBody = {
  name: string;
  phone: string;
  email?: string | null;
  service: ApiServiceType;
  date?: string | null;
  preferredTime?: string | null;
  location?: string | null;
  details?: string | null;
};

export function toApiInquiryBody(payload: InquiryPayload): ApiInquiryBody {
  return {
    name: payload.name,
    phone: payload.phone,
    email: payload.email ?? null,
    service: SERVICE_TO_API[payload.service],
    date: payload.expectedDate ?? null,
    preferredTime: payload.preferredTime ?? null,
    location: payload.city ?? null,
    details: payload.details ?? null,
  };
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const body = toApiInquiryBody(payload);
  const res = await fetch(`${SITE.apiBase}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Inquiry failed (${res.status})`);
  }
}

export function whatsappUrl(prefill?: string): string {
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : '';
  return `https://wa.me/${SITE.whatsappNumber}${text}`;
}
