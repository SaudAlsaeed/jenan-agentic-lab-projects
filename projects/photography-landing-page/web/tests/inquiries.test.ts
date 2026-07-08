import { describe, expect, it } from 'vitest';
import { toApiInquiryBody } from '@/api/inquiries';

describe('toApiInquiryBody', () => {
  it('maps events → weddings_events and expectedDate/city → date/location', () => {
    expect(
      toApiInquiryBody({
        name: 'سارة',
        phone: '0501234567',
        email: 'sara@example.com',
        service: 'events',
        expectedDate: '2026-08-01',
        preferredTime: 'مساءً',
        city: 'الرياض',
        details: 'تغطية زفاف',
      }),
    ).toEqual({
      name: 'سارة',
      phone: '0501234567',
      email: 'sara@example.com',
      service: 'weddings_events',
      date: '2026-08-01',
      preferredTime: 'مساءً',
      location: 'الرياض',
      details: 'تغطية زفاف',
    });
  });

  it('maps portrait → portraits', () => {
    expect(
      toApiInquiryBody({
        name: 'أحمد',
        phone: '0509876543',
        service: 'portrait',
      }),
    ).toMatchObject({
      service: 'portraits',
      date: null,
      location: null,
      email: null,
      preferredTime: null,
      details: null,
    });
  });

  it('passes through video and products unchanged', () => {
    expect(
      toApiInquiryBody({ name: 'نورة', phone: '0501111111', service: 'video' })
        .service,
    ).toBe('video');
    expect(
      toApiInquiryBody({
        name: 'نورة',
        phone: '0501111111',
        service: 'products',
      }).service,
    ).toBe('products');
  });
});
