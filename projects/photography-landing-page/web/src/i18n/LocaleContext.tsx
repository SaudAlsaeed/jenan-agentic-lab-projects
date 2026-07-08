import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '@/config/site';
import { messages, type Messages } from '@/i18n/messages';

const STORAGE_KEY = 'plp-locale';

type LocaleContextValue = {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    /* ignore */
  }
  return 'ar';
}

function applyDocumentLocale(locale: Locale) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
  document.documentElement.dir = dir;
  const t = messages[locale];
  document.title = t.seoTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', t.seoDescription);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'ar' : readStoredLocale(),
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  }, [locale, setLocale]);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      t: messages[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
