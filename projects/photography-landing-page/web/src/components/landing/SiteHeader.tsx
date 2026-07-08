import { useEffect, useState } from 'react';
import { BookCta, Button } from '@/components/ui/Button';
import { useLocale } from '@/i18n/LocaleContext';

const NAV_IDS = [
  { id: 'hero', key: 'home' as const },
  { id: 'portfolio', key: 'portfolio' as const },
  { id: 'services', key: 'services' as const },
  { id: 'packages', key: 'packages' as const },
  { id: 'how', key: 'how' as const },
  { id: 'contact', key: 'contact' as const },
];

export function SiteHeader() {
  const { t, toggleLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navClass = scrolled
    ? 'border-b border-[var(--line)] bg-[var(--bg-elevated)]/95 backdrop-blur-md'
    : 'border-b border-transparent bg-transparent';

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${navClass}`}
    >
      <div className="mx-auto flex max-w-[var(--content-max)] items-center justify-between gap-4 px-[var(--pad-x)] py-3 lg:py-4">
        <a
          href="#hero"
          className="font-display shrink-0 text-[length:var(--text-wordmark)] font-bold tracking-wide text-[var(--text-primary)]"
        >
          {t.brand}
        </a>

        <nav
          className="font-ui hidden items-center gap-5 text-[length:var(--text-label)] lg:flex"
          aria-label="Primary"
        >
          {NAV_IDS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="font-ui hidden min-h-[var(--touch-min)] items-center rounded-sm px-3 text-[length:var(--text-label)] text-[var(--text-muted)] hover:text-[var(--text-primary)] sm:inline-flex"
          >
            {t.nav.langToggle}
          </button>
          <div className="hidden sm:block">
            <BookCta />
          </div>
          <button
            type="button"
            className="font-ui inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center rounded-sm border border-[var(--line)] text-[var(--text-primary)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden className="text-lg">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--pad-x)] py-4 lg:hidden"
        >
          <nav className="font-ui flex flex-col gap-1" aria-label="Mobile">
            {NAV_IDS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className="min-h-[var(--touch-min)] py-2 text-[var(--text-primary)]"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[key]}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleLocale();
                setMenuOpen(false);
              }}
              className="min-h-[var(--touch-min)] py-2 text-start text-[var(--text-muted)]"
            >
              {t.nav.langToggle}
            </button>
            <div className="pt-2">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.nav.book}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
