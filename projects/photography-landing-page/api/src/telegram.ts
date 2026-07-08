import {
  SERVICE_LABELS_AR,
  SERVICE_LABELS_EN,
  type ServiceType,
} from './constants.js';
import type { CreateInquiryInput } from './types.js';

export type TelegramSender = (
  token: string,
  chatId: string,
  text: string,
) => Promise<{ ok: boolean; status: number; body: string }>;

export const defaultTelegramSender: TelegramSender = async (
  token,
  chatId,
  text,
) => {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );
  const body = await response.text();
  return { ok: response.ok, status: response.status, body };
};

export function formatInquiryTelegramMessage(input: CreateInquiryInput): string {
  const service = input.service as ServiceType;
  const serviceLabel = `${SERVICE_LABELS_AR[service]} / ${SERVICE_LABELS_EN[service]}`;

  return [
    '📸 New Photography Inquiry',
    '',
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email ?? 'Not provided'}`,
    `Service: ${serviceLabel}`,
    `Date: ${input.date ?? 'Not provided'}`,
    `Preferred Time: ${input.preferredTime ?? 'Not provided'}`,
    `Location: ${input.location ?? 'Not provided'}`,
    '',
    'Details:',
    input.details ?? 'No details provided',
  ].join('\n');
}

export async function sendInquiryTelegram(options: {
  token: string;
  chatId: string;
  input: CreateInquiryInput;
  sender?: TelegramSender;
}): Promise<{ ok: boolean; status: number; body: string }> {
  const text = formatInquiryTelegramMessage(options.input);
  const sender = options.sender ?? defaultTelegramSender;
  return sender(options.token, options.chatId, text);
}
