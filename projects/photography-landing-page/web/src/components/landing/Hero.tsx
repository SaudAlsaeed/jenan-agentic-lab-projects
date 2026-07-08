import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useContactPrefill } from '@/context/ContactPrefillContext';
import { useLocale } from '@/i18n/LocaleContext';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80';

export function Hero() {
  const { t } = useLocale();
  const { requestContact } = useContactPrefill();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const enter = (delay: number) =>
    visible
      ? `translate-y-0 opacity-100 transition-all duration-700 ease-out [transition-delay:${delay}ms]`
      : 'translate-y-3 opacity-0';

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 lg:items-center lg:pb-24 lg:pt-24"
      aria-label={t.nav.home}
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(11,12,14,0.35), rgba(11,12,14,0.88) 70%), linear-gradient(to top, var(--bg-void) 0%, transparent 45%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--content-max)] px-[var(--pad-x)]">
        <p
          className={`font-display mb-3 text-[length:var(--text-wordmark)] font-bold tracking-wide text-[var(--accent-sand)] ${enter(0)}`}
        >
          {t.brand}
        </p>
        <h1
          className={`font-display mb-4 max-w-3xl text-[length:var(--text-hero)] font-extrabold leading-[var(--leading-hero)] text-[var(--text-primary)] ${enter(80)}`}
        >
          {t.hero.headline}
        </h1>
        <p
          className={`mb-8 max-w-xl text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)] ${enter(160)}`}
        >
          {t.hero.support}
        </p>
        <div className={`flex flex-wrap gap-3 ${enter(240)}`}>
          <Button onClick={() => requestContact()}>{t.hero.ctaPrimary}</Button>
          <Button variant="secondary" href="#portfolio">
            {t.hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
