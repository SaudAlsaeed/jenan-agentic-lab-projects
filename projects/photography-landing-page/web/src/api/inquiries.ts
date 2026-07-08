import { SITE } from '@/config/site';
import type { InquiryPayload } from '@/data/portfolio';

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const res = await fetch(`${SITE.apiBase}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Inquiry failed (${res.status})`);
  }
}

export function whatsappUrl(prefill?: string): string {
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : '';
  return `https://wa.me/${SITE.whatsappNumber}${text}`;
}
