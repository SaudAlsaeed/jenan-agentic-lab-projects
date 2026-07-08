import type { InquiryStatus, ServiceType } from './constants.js';

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: ServiceType;
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

export type CreateInquiryInput = {
  name: string;
  phone: string;
  email?: string | null;
  service: ServiceType;
  date?: string | null;
  preferredTime?: string | null;
  location?: string | null;
  details?: string | null;
};

export type InquiryFilters = {
  status?: InquiryStatus;
  service?: ServiceType;
  /** Inclusive YYYY-MM-DD */
  dateFrom?: string;
  /** Inclusive YYYY-MM-DD */
  dateTo?: string;
  /** Match name or phone (case-insensitive substring). */
  q?: string;
};

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
};
