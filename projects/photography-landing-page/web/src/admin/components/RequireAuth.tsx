import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/admin/AuthContext';

export function RequireAuth() {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname, reason: 'auth' }}
      />
    );
  }

  return <Outlet />;
}
