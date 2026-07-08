import { SITE } from '@/config/site';
import { clearAdminSession, getAdminToken, setAdminSession } from '@/admin/auth';
import type {
  Inquiry,
  InquiryListFilters,
  InquiryStatus,
} from '@/admin/types';

export class AdminApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
  }
}

type LoginResponse = {
  token: string;
  tokenType: string;
  expiresIn: string;
  admin: { id: string; username: string };
};

async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
  auth = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (auth) {
    const token = getAdminToken();
    if (!token) {
      throw new AdminApiError(401, 'Not authenticated');
    }
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${SITE.apiBase}${path}`, { ...init, headers });

  if (res.status === 401 && auth) {
    clearAdminSession();
    throw new AdminApiError(401, 'انتهت الجلسة — يرجى تسجيل الدخول مرة أخرى');
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new AdminApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const data = await adminFetch<LoginResponse>(
    '/api/admin/login',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    false,
  );
  setAdminSession({ token: data.token, username: data.admin.username });
  return data;
}

export async function listInquiries(
  filters: InquiryListFilters = {},
): Promise<{ items: Inquiry[]; total: number }> {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.service) params.set('service', filters.service);
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.set('dateTo', filters.dateTo);
  if (filters.q?.trim()) params.set('q', filters.q.trim());
  const qs = params.toString();
  return adminFetch(`/api/admin/inquiries${qs ? `?${qs}` : ''}`);
}

export async function getInquiry(id: string): Promise<Inquiry> {
  const data = await adminFetch<{ inquiry: Inquiry }>(
    `/api/admin/inquiries/${id}`,
  );
  return data.inquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<Inquiry> {
  const data = await adminFetch<{ inquiry: Inquiry }>(
    `/api/admin/inquiries/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
  );
  return data.inquiry;
}

export async function updateInquiryNotes(
  id: string,
  internalNotes: string,
): Promise<Inquiry> {
  const data = await adminFetch<{ inquiry: Inquiry }>(
    `/api/admin/inquiries/${id}/notes`,
    {
      method: 'PATCH',
      body: JSON.stringify({ internalNotes }),
    },
  );
  return data.inquiry;
}

export function phoneTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}

export function inquiryWhatsAppUrl(
  inquiry: Inquiry,
  serviceLabel?: string,
): string {
  const digits = inquiry.phone.replace(/\D/g, '');
  const local = digits.startsWith('0') ? `966${digits.slice(1)}` : digits;
  const label = serviceLabel ?? inquiry.service;
  const text = encodeURIComponent(
    `مرحباً ${inquiry.name}، بخصوص طلب ${label}`,
  );
  return `https://wa.me/${local}?text=${text}`;
}
