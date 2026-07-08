import { ContactPrefillProvider } from '@/context/ContactPrefillContext';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { LandingPage } from '@/pages/LandingPage';

export function App() {
  return (
    <LocaleProvider>
      <ContactPrefillProvider>
        <LandingPage />
      </ContactPrefillProvider>
    </LocaleProvider>
  );
}
