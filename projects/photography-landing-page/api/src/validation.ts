import { z } from 'zod';
import { INQUIRY_STATUSES, SERVICE_TYPES } from './constants.js';

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v.length === 0 ? null : v))
  .nullable()
  .optional()
  .transform((v) => v ?? null);

const optionalEmail = z
  .string()
  .trim()
  .transform((v) => (v.length === 0 ? null : v))
  .nullable()
  .optional()
  .transform((v) => v ?? null)
  .refine((v) => v === null || z.email().safeParse(v).success, {
    message: 'email is invalid',
  });

export const createInquirySchema = z.object({
  name: z.string().trim().min(1, 'name is required').max(120),
  phone: z
    .string()
    .trim()
    .min(1, 'phone is required')
    .max(40)
    .regex(/^[\d+\s()-]{7,40}$/, 'phone format is invalid'),
  email: optionalEmail,
  service: z.enum(SERVICE_TYPES),
  date: optionalText,
  preferredTime: optionalText,
  location: optionalText,
  details: optionalText,
});

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export const listInquiriesQuerySchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
  service: z.enum(SERVICE_TYPES).optional(),
  dateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  dateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  q: z.string().trim().min(1).max(120).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES),
});

export const updateNotesSchema = z.object({
  internalNotes: z.string().max(5000),
});

export type CreateInquiryBody = z.infer<typeof createInquirySchema>;
