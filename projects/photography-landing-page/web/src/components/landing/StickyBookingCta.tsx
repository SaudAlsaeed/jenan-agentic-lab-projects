import { useEffect, useState } from 'react';
import { useContactPrefill } from '@/context/ContactPrefillContext';
import { useLocale } from '@/i18n/LocaleContext';

export function StickyBookingCta() {
  const { t } = useLocale();
  const { requestContact } = useContactPrefill();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero || !contact) return;

    let heroGone = false;
    let contactVisible = false;

    const update = () => {
      const isMobile = window.matchMedia('(max-width: 1024px)').matches;
      setShow(isMobile && heroGone && !contactVisible);
    };

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    const contactObs = new IntersectionObserver(
      ([entry]) => {
        contactVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 },
    );

    heroObs.observe(hero);
    contactObs.observe(contact);
    const onResize = () => update();
    window.addEventListener('resize', onResize);
    update();

    return () => {
      heroObs.disconnect();
      contactObs.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
      <button
        type="button"
        className="font-ui pointer-events-auto min-h-[var(--touch-min)] animate-[slideUp_0.3s_ease-out] rounded-full bg-[var(--accent-sand)] px-8 text-[length:var(--text-label)] font-medium text-[var(--bg-void)] shadow-lg shadow-black/40 transition hover:bg-[var(--accent-sand-hover)]"
        onClick={() => requestContact()}
      >
        {t.stickyCta}
      </button>
    </div>
  );
}
