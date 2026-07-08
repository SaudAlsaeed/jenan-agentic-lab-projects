import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ServiceType } from '@/config/site';

type ContactPrefillContextValue = {
  prefillService: ServiceType | null;
  requestContact: (service?: ServiceType) => void;
  clearPrefill: () => void;
};

const ContactPrefillContext = createContext<ContactPrefillContextValue | null>(
  null,
);

export function ContactPrefillProvider({ children }: { children: ReactNode }) {
  const [prefillService, setPrefillService] = useState<ServiceType | null>(
    null,
  );

  const requestContact = useCallback((service?: ServiceType) => {
    if (service) setPrefillService(service);
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const clearPrefill = useCallback(() => setPrefillService(null), []);

  const value = useMemo(
    () => ({ prefillService, requestContact, clearPrefill }),
    [prefillService, requestContact, clearPrefill],
  );

  return (
    <ContactPrefillContext.Provider value={value}>
      {children}
    </ContactPrefillContext.Provider>
  );
}

export function useContactPrefill() {
  const ctx = useContext(ContactPrefillContext);
  if (!ctx) {
    throw new Error(
      'useContactPrefill must be used within ContactPrefillProvider',
    );
  }
  return ctx;
}
