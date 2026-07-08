import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/App';

vi.mock('@/api/inquiries', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/inquiries')>();
  return {
    ...actual,
    submitInquiry: vi.fn(),
  };
});

import { submitInquiry } from '@/api/inquiries';

describe('Landing page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(submitInquiry).mockReset();
    vi.mocked(submitInquiry).mockResolvedValue(undefined);
  });

  it('renders brand wordmark and main landmark', () => {
    render(<App />);
    expect(
      screen.getAllByText('وكالة محمد السعيد للتصوير الإحترافي').length,
    ).toBeGreaterThan(0);
    expect(document.getElementById('main')).toBeTruthy();
    expect(document.getElementById('hero')).toBeTruthy();
    expect(document.getElementById('portfolio')).toBeTruthy();
    expect(document.getElementById('contact')).toBeTruthy();
  });

  it('switches portfolio tabs', async () => {
    const user = userEvent.setup();
    render(<App />);
    const portraitTab = screen.getByRole('tab', { name: 'بورتريه' });
    await user.click(portraitTab);
    expect(portraitTab).toHaveAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-portrait');
    expect(panel).toBeTruthy();
    expect(within(panel!).getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('validates required contact fields', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'إرسال الطلب' }));
    expect(screen.getAllByText('هذا الحقل مطلوب').length).toBeGreaterThanOrEqual(
      2,
    );
    expect(submitInquiry).not.toHaveBeenCalled();
  });

  it('shows success message after valid submit', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText(/الاسم الكامل/);
    const phoneInput = screen.getByLabelText(/رقم الجوال/);
    const serviceSelect = screen.getByLabelText(/نوع الخدمة/);

    await user.type(nameInput, 'سارة');
    await user.type(phoneInput, '0501234567');
    await user.selectOptions(serviceSelect, 'events');
    await user.click(screen.getByRole('button', { name: 'إرسال الطلب' }));

    expect(await screen.findByText(/تم استلام طلبك بنجاح/)).toBeInTheDocument();
    expect(submitInquiry).toHaveBeenCalledOnce();
    expect(submitInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'سارة',
        phone: '0501234567',
        service: 'events',
      }),
    );
  });

  it('shows error banner when submit fails', async () => {
    vi.mocked(submitInquiry).mockRejectedValueOnce(new Error('network'));
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/الاسم الكامل/), 'أحمد');
    await user.type(screen.getByLabelText(/رقم الجوال/), '0501234567');
    await user.selectOptions(screen.getByLabelText(/نوع الخدمة/), 'video');
    await user.click(screen.getByRole('button', { name: 'إرسال الطلب' }));

    expect(
      await screen.findByText(/حدث خطأ أثناء الإرسال/),
    ).toBeInTheDocument();
  });

  it('toggles language to English', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(
      screen.getAllByText('Mohammed Alsaeed Agency for Professional Photography')
        .length,
    ).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });
});
