import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminAuthProvider } from '@/admin/AuthContext';
import { clearAdminSession, setAdminSession } from '@/admin/auth';
import { AdminShell } from '@/admin/components/AdminShell';
import { RequireAuth } from '@/admin/components/RequireAuth';
import { AdminInquiryDetailPage } from '@/admin/pages/AdminInquiryDetailPage';
import { AdminInquiryListPage } from '@/admin/pages/AdminInquiryListPage';
import { AdminLoginPage } from '@/admin/pages/AdminLoginPage';
import type { Inquiry } from '@/admin/types';

const sampleInquiry: Inquiry = {
  id: 'inq-1',
  name: 'نورة العتيبي',
  phone: '0501234567',
  email: 'noura@example.com',
  service: 'weddings_events',
  date: '2026-08-01',
  preferredTime: 'مساءً',
  location: 'الرياض',
  details: 'تغطية زفاف',
  status: 'جديد',
  internalNotes: null,
  telegramSent: true,
  createdAt: '2026-07-08T10:00:00.000Z',
  updatedAt: '2026-07-08T10:00:00.000Z',
};

vi.mock('@/admin/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/admin/api')>();
  return {
    ...actual,
    adminLogin: vi.fn(),
    listInquiries: vi.fn(),
    getInquiry: vi.fn(),
    updateInquiryStatus: vi.fn(),
    updateInquiryNotes: vi.fn(),
  };
});

import {
  adminLogin,
  getInquiry,
  listInquiries,
  updateInquiryNotes,
  updateInquiryStatus,
} from '@/admin/api';

function renderAdmin(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminShell />}>
              <Route index element={<AdminInquiryListPage />} />
              <Route
                path="inquiries/:id"
                element={<AdminInquiryDetailPage />}
              />
            </Route>
          </Route>
        </Routes>
      </AdminAuthProvider>
    </MemoryRouter>,
  );
}

describe('Admin dashboard', () => {
  beforeEach(() => {
    clearAdminSession();
    vi.mocked(adminLogin).mockReset();
    vi.mocked(listInquiries).mockReset();
    vi.mocked(getInquiry).mockReset();
    vi.mocked(updateInquiryStatus).mockReset();
    vi.mocked(updateInquiryNotes).mockReset();
  });

  it('redirects unauthenticated users from /admin to login', async () => {
    renderAdmin('/admin');
    expect(
      await screen.findByRole('heading', { name: 'تسجيل الدخول' }),
    ).toBeInTheDocument();
  });

  it('logs in and shows inquiry list', async () => {
    vi.mocked(adminLogin).mockImplementation(async (username) => {
      setAdminSession({ token: 'tok', username });
      return {
        token: 'tok',
        tokenType: 'Bearer',
        expiresIn: '8h',
        admin: { id: '1', username },
      };
    });
    vi.mocked(listInquiries).mockResolvedValue({
      items: [sampleInquiry],
      total: 1,
    });

    const user = userEvent.setup();
    renderAdmin('/admin/login');

    await user.type(screen.getByLabelText('اسم المستخدم'), 'admin');
    await user.type(screen.getByLabelText('كلمة المرور'), 'changeme');
    await user.click(screen.getByRole('button', { name: 'دخول' }));

    expect(
      await screen.findByRole('heading', { name: 'الطلبات' }),
    ).toBeInTheDocument();
    expect(
      await screen.findAllByText('نورة العتيبي'),
    ).not.toHaveLength(0);
    expect(listInquiries).toHaveBeenCalled();
  });

  it('shows detail with status and notes controls when authenticated', async () => {
    setAdminSession({ token: 'tok', username: 'admin' });
    vi.mocked(getInquiry).mockResolvedValue(sampleInquiry);
    vi.mocked(updateInquiryStatus).mockResolvedValue({
      ...sampleInquiry,
      status: 'تم التواصل',
    });
    vi.mocked(updateInquiryNotes).mockResolvedValue({
      ...sampleInquiry,
      status: 'تم التواصل',
      internalNotes: 'تم الاتصال صباحاً',
    });

    const user = userEvent.setup();
    renderAdmin('/admin/inquiries/inq-1');

    expect(
      await screen.findByRole('heading', { name: 'نورة العتيبي' }),
    ).toBeInTheDocument();
    expect(screen.getByText('تغطية زفاف')).toBeInTheDocument();

    const statusSelect = screen.getByLabelText('تحديث الحالة');
    await user.selectOptions(statusSelect, 'تم التواصل');
    await waitFor(() =>
      expect(updateInquiryStatus).toHaveBeenCalledWith(
        'inq-1',
        'تم التواصل',
      ),
    );

    const notes = screen.getByLabelText('الملاحظات الداخلية');
    await user.clear(notes);
    await user.type(notes, 'تم الاتصال صباحاً');
    await user.click(screen.getByRole('button', { name: 'حفظ الملاحظات' }));
    await waitFor(() =>
      expect(updateInquiryNotes).toHaveBeenCalledWith(
        'inq-1',
        'تم الاتصال صباحاً',
      ),
    );
    expect(await screen.findByText('تم الحفظ')).toBeInTheDocument();

    const callLink = screen.getByRole('link', { name: 'اتصال' });
    expect(callLink).toHaveAttribute('href', 'tel:0501234567');
    const wa = screen.getByRole('link', { name: 'واتساب' });
    expect(wa.getAttribute('href')).toContain('wa.me/966501234567');
  });

  it('filters list by status', async () => {
    setAdminSession({ token: 'tok', username: 'admin' });
    vi.mocked(listInquiries).mockResolvedValue({ items: [], total: 0 });

    const user = userEvent.setup();
    renderAdmin('/admin');

    await screen.findByRole('heading', { name: 'الطلبات' });
    await user.selectOptions(screen.getByLabelText('الحالة'), 'مؤكد');

    await waitFor(() =>
      expect(listInquiries).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'مؤكد' }),
      ),
    );
    expect(
      within(document.body).getByText(/لا توجد طلبات/),
    ).toBeInTheDocument();
  });
});
