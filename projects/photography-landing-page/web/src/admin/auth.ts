const TOKEN_KEY = 'plp-admin-token';
const USER_KEY = 'plp-admin-user';

export type AdminSession = {
  token: string;
  username: string;
};

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getAdminUsername(): string | null {
  try {
    return localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, session.username);
}

export function clearAdminSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken());
}
