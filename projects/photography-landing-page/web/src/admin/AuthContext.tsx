import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAdminSession,
  getAdminToken,
  getAdminUsername,
} from '@/admin/auth';
import { adminLogin } from '@/admin/api';

type AuthContextValue = {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAdminToken());
  const [username, setUsername] = useState<string | null>(() =>
    getAdminUsername(),
  );

  const login = useCallback(async (user: string, password: string) => {
    const data = await adminLogin(user, password);
    setToken(data.token);
    setUsername(data.admin.username);
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    setToken(null);
    setUsername(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      username,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, username, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
