import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AdminAuthProvider } from '@/admin/AuthContext';
import { AdminShell } from '@/admin/components/AdminShell';
import { RequireAuth } from '@/admin/components/RequireAuth';
import { AdminInquiryDetailPage } from '@/admin/pages/AdminInquiryDetailPage';
import { AdminInquiryListPage } from '@/admin/pages/AdminInquiryListPage';
import { AdminLoginPage } from '@/admin/pages/AdminLoginPage';
import { ContactPrefillProvider } from '@/context/ContactPrefillContext';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { LandingPage } from '@/pages/LandingPage';

function PublicLanding() {
  return (
    <LocaleProvider>
      <ContactPrefillProvider>
        <LandingPage />
      </ContactPrefillProvider>
    </LocaleProvider>
  );
}

function AdminRoot() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLanding />,
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AdminShell />,
            children: [
              { index: true, element: <AdminInquiryListPage /> },
              {
                path: 'inquiries/:id',
                element: <AdminInquiryDetailPage />,
              },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },
]);
