import { ContactSection } from '@/components/landing/ContactSection';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PackagesSection } from '@/components/landing/PackagesSection';
import { PortfolioSection } from '@/components/landing/PortfolioSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { StickyBookingCta } from '@/components/landing/StickyBookingCta';
import { TrustHighlights } from '@/components/landing/TrustHighlights';
import { WhatsAppFab } from '@/components/landing/WhatsAppFab';
import { useLocale } from '@/i18n/LocaleContext';

export function LandingPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <a
        href="#main"
        className="font-ui sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--bg-elevated)] focus:px-3 focus:py-2 focus:text-[var(--accent-sand)]"
      >
        {t.skipToContent}
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <TrustHighlights />
        <PortfolioSection />
        <ServicesSection />
        <PackagesSection />
        <HowItWorks />
        <ContactSection />
      </main>

      <SiteFooter />
      <StickyBookingCta />
      <WhatsAppFab />
    </div>
  );
}
